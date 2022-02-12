import {
  getConnection,
  Connection,
  QueryRunner,
  In,
  FindManyOptions,
} from 'typeorm';
import { QuotationProduct } from '@models';

import {IProductQuotation} from '@interfaces';

class QuotationProductRepository {
  async getquotationProductsIds(quotation: number): Promise<number[]> {
    const connection: Connection = getConnection();
    const queryRunner: QueryRunner = connection.createQueryRunner();

    await queryRunner.connect();

    const ids: number[] = [];

    const quotationProducts: any[] = await queryRunner.manager.find(QuotationProduct, {
      where: { quotation: quotation },
      relations: ['product'],
    });

    quotationProducts.forEach((quotationProduct) => {
      ids.push(quotationProduct.product.id);
    });

    await queryRunner.release();

    return ids;
  }

  async getQuotationProduct(query: FindManyOptions<QuotationProduct>) {
    const connection: Connection = getConnection();
    const queryRunner: QueryRunner = connection.createQueryRunner();

    await queryRunner.connect();

    const quotationProducts = await queryRunner.manager.find(QuotationProduct, query);

    await queryRunner.release();

    return quotationProducts;
  }

  async setQuotationProduct(
    quotationId: number,
    quotationProductIds: number[],
    productQuotations: IProductQuotation[]
  ): Promise<void> {
    const connection: Connection = getConnection();
    const queryRunner: QueryRunner = connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newProductIds: object[] = [];
      const removeProductIds: number[] = [];

      // * remove all user products 
      if (productQuotations.length === 0) {
        const quotationProducts = await this.getQuotationProduct({
          where: { quotation: quotationId },
        });

        await connection
          .createQueryBuilder()
          .delete()
          .from(QuotationProduct)
          .where(quotationProducts)
          .execute();

        await queryRunner.commitTransaction();

        return;
      }

      // * get new products
      productQuotations.forEach((productQuotation) => {
        if (!quotationProductIds.includes(productQuotation.id))
          newProductIds.push({
            quotation: quotationId,
            product: productQuotation.id,
            quantity: productQuotation.quantity
          });
      });

      // * get remove products
      quotationProductIds.forEach((quotationProduct) => {
        if (!(productQuotations.filter(pQ => pQ.id === quotationProduct).length > 0))
          removeProductIds.push(quotationProduct);
      });

      if (newProductIds.length > 0) {
        await connection
          .createQueryBuilder()
          .insert()
          .into(QuotationProduct)
          .values(newProductIds)
          .execute();
      }

      if (removeProductIds.length > 0) {
        const quotationProducts = await this.getQuotationProduct({
          where: { product: In(removeProductIds) },
        });

        await connection
          .createQueryBuilder()
          .delete()
          .from(QuotationProduct)
          .where(quotationProducts)
          .execute();
      }

      await queryRunner.commitTransaction();

      return;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await connection.close();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}

export default new QuotationProductRepository();
