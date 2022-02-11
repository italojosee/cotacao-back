import { getConnection, Connection, QueryRunner } from 'typeorm';
import { CompanyProvider } from '@models';
import { ICompanyprovider } from '@interfaces';

class CompanyProviderRepository {
  relations = [];

  async list(
    page: number,
    itemsPerPage: number
  ): Promise<object> {
    const connection: Connection = getConnection();
    const queryRunner: QueryRunner = connection.createQueryRunner();

    await queryRunner.connect();

    try {
      const rows = await queryRunner.manager.find(CompanyProvider, {
        order: {
          createdAt: 'ASC',
        },
        take: +itemsPerPage,
        skip: +page * +itemsPerPage,
      });

      return rows;
    } catch (error) {
      console.log('CompanyProviderRepository list error', error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async store(
    body: ICompanyprovider
  ): Promise<CompanyProvider> {
    const connection: Connection = getConnection();
    const queryRunner: QueryRunner = connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {

      const data: CompanyProvider = await queryRunner.manager.create(CompanyProvider, body);

      await queryRunner.manager.save(data);

      await queryRunner.commitTransaction();

      return data;
    } catch (error) {
      console.log('CompanyProviderRepository store error', error);
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
      const data = await queryRunner.manager.findOne(CompanyProvider, id, {
        relations: this.relations,
      });

      return data;
    } catch (error) {
      console.log('CompanyProviderRepository findOneById error', error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
  async findOneByCNPJ(cnpj: string) {
    const connection: Connection = getConnection();
    const queryRunner: QueryRunner = connection.createQueryRunner();

    await queryRunner.connect();

    try {
      const data = await queryRunner.manager.findOne(CompanyProvider, { where: { cnpj } });

      return data;
    } catch (error) {
      console.log('CompanyProviderRepository findOneById error', error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}

export default new CompanyProviderRepository();
