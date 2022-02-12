import {
  getConnection,
  Connection,
  QueryRunner,
  In,
  FindManyOptions,
} from 'typeorm';
import { QuotationProvider } from '@models';

class QuotationProviderRepository {
  async getquotationProvidersIds(quotation: number): Promise<number[]> {
    const connection: Connection = getConnection();
    const queryRunner: QueryRunner = connection.createQueryRunner();

    await queryRunner.connect();

    const ids: number[] = [];

    const quotationProviders: any[] = await queryRunner.manager.find(QuotationProvider, {
      where: { quotation: quotation },
      relations: ['provider'],
    });

    quotationProviders.forEach((quotationProvider) => {
      ids.push(quotationProvider.provider.id);
    });

    await queryRunner.release();

    return ids;
  }

  async getQuotationProvider(query: FindManyOptions<QuotationProvider>) {
    const connection: Connection = getConnection();
    const queryRunner: QueryRunner = connection.createQueryRunner();

    await queryRunner.connect();

    const quotationProviders = await queryRunner.manager.find(QuotationProvider, query);

    await queryRunner.release();

    return quotationProviders;
  }

  async setQuotationProvider(
    quotationId: number,
    quotationProviderIds: number[],
    providerIds: number[]
  ): Promise<void> {
    const connection: Connection = getConnection();
    const queryRunner: QueryRunner = connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newProviderIds: object[] = [];
      const removeProviderIds: number[] = [];

      // * remove all user providers 
      if (providerIds.length === 0) {
        const quotationProviders = await this.getQuotationProvider({
          where: { quotation: quotationId },
        });

        await connection
          .createQueryBuilder()
          .delete()
          .from(QuotationProvider)
          .where(quotationProviders)
          .execute();

        await queryRunner.commitTransaction();

        return;
      }

      // * get new providers
      providerIds.forEach((providerId) => {
        if (!quotationProviderIds.includes(providerId))
          newProviderIds.push({
            quotation: quotationId,
            provider: providerId,
          });
      });

      // * get remove providers
      quotationProviderIds.forEach((quotationProvider) => {
        if (!providerIds.includes(quotationProvider))
          removeProviderIds.push(quotationProvider);
      });

      if (newProviderIds.length > 0) {
        await connection
          .createQueryBuilder()
          .insert()
          .into(QuotationProvider)
          .values(newProviderIds)
          .execute();
      }

      if (removeProviderIds.length > 0) {
        const quotationProviders = await this.getQuotationProvider({
          where: { provider: In(removeProviderIds) },
        });

        await connection
          .createQueryBuilder()
          .delete()
          .from(QuotationProvider)
          .where(quotationProviders)
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

export default new QuotationProviderRepository();
