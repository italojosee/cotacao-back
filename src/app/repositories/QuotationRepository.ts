import { getConnection, Connection, QueryRunner } from 'typeorm';
import { Quotation, QuotationProvider, QuotationProduct } from '@models';
import { IQuotationStore } from '@interfaces';

import { QuotationProviderRepository, ProviderAgentRepository, QuotationProductRepository, ProductRepository } from './index';

class QuotationRepository {
  relations = [
    'responsible',
    'quotationProducts',
    'quotationProducts.product',
    'quotationProviders',
    'quotationProviders.agent',
    'quotationProviders.agent.companyProvider'
  ];

  async list(
    page: number,
    itemsPerPage: number
  ): Promise<object> {
    const connection: Connection = getConnection();
    const queryRunner: QueryRunner = connection.createQueryRunner();

    await queryRunner.connect();

    try {
      const rows = await queryRunner.manager.find(Quotation, {
        order: {
          createdAt: 'ASC',
        },
        take: +itemsPerPage,
        skip: +page * +itemsPerPage,
      });

      return rows;
    } catch (error) {
      console.log('QuotationRepository list error', error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async store(
    body: IQuotationStore
  ): Promise<Quotation> {
    const connection: Connection = getConnection();
    const queryRunner: QueryRunner = connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {

      const { agents, products, ...quotationBody } = body;

      const quotation: Quotation = await queryRunner.manager.create(Quotation, quotationBody);
      await queryRunner.manager.save(quotation);

      // relation quotation provider
      const quotationProvidertIds = await QuotationProviderRepository.getquotationProvidersIds(
        quotation.id
      );
      const providerValidIds = await ProviderAgentRepository.validateProviderIds(
        agents
      );

      await QuotationProviderRepository.setQuotationProvider(
        quotation.id,
        quotationProvidertIds,
        providerValidIds
      );

      // relation quotation product
      const quotationProductIds = await QuotationProductRepository.getquotationProductsIds(
        quotation.id
      );
      const productValidIds = await ProductRepository.validateProductQuotationIds(
        products
      );

      await QuotationProductRepository.setQuotationProduct(
        quotation.id,
        quotationProductIds,
        productValidIds
      );

      await queryRunner.commitTransaction();

      return quotation;
    } catch (error) {
      console.log('QuotationRepository store error', error);
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
      const data = await queryRunner.manager.findOne(Quotation, id, {
        relations: this.relations,
      });

      return data;
    } catch (error) {
      console.log('QuotationRepository findOneById error', error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}

export default new QuotationRepository();
