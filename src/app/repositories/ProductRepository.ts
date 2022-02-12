import { getConnection, Connection, QueryRunner, In } from 'typeorm';
import { Product } from '@models';
import { IProductStore, IProductQuotation } from '@interfaces';

class ProductRepository {
  relations = [];

  async list(
    page: number,
    itemsPerPage: number
  ): Promise<object> {
    const connection: Connection = getConnection();
    const queryRunner: QueryRunner = connection.createQueryRunner();

    await queryRunner.connect();

    try {
      const rows = await queryRunner.manager.find(Product, {
        order: {
          createdAt: 'ASC',
        },
        take: +itemsPerPage,
        skip: +page * +itemsPerPage,
      });

      return rows;
    } catch (error) {
      console.log('ProductRepository list error', error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async store(
    body: IProductStore
  ): Promise<Product> {
    const connection: Connection = getConnection();
    const queryRunner: QueryRunner = connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {

      const data: Product = await queryRunner.manager.create(Product, body);

      await queryRunner.manager.save(data);

      await queryRunner.commitTransaction();

      return data;
    } catch (error) {
      console.log('ProductRepository store error', error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }


  async findOneById(id: number) {
    const connection: Connection = getConnection();
    const queryRunner: QueryRunner = connection.createQueryRunner();

    await queryRunner.connect();

    try {
      const data = await queryRunner.manager.findOne(Product, id, {
        relations: this.relations,
      });

      return data;
    } catch (error) {
      console.log('ProductRepository findOneById error', error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async validateProductQuotationIds(productQuotations: IProductQuotation[]): Promise<IProductQuotation[]> {
    const connection: Connection = getConnection();
    const queryRunner: QueryRunner = connection.createQueryRunner();

    await queryRunner.connect();

    const companyProdiderIds: IProductQuotation[] = [];

    const productIds: number[] = productQuotations.map((pQ) => pQ.id);

    const products = await queryRunner.manager.find(Product, {
      where: { id: In(productIds) },
    });

    products.forEach((product) => companyProdiderIds.push({
      id: product.id,
      quantity: productQuotations.filter(pQ => pQ.id === product.id)?.[0]?.quantity || 0
    }));

    await queryRunner.release();

    return companyProdiderIds;
  }

}

export default new ProductRepository();
