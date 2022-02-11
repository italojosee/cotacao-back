import { getConnection, Connection, QueryRunner } from 'typeorm';
import { ProviderAgent } from '@models';
import { IProviderAgent } from '@interfaces';

class ProviderAgentRepository {
  relations = [];

  async list(
    page: number,
    itemsPerPage: number
  ): Promise<object> {
    const connection: Connection = getConnection();
    const queryRunner: QueryRunner = connection.createQueryRunner();

    await queryRunner.connect();

    try {
      const rows = await queryRunner.manager.find(ProviderAgent, {
          order: {
            createdAt: 'ASC',
          },
          take: +itemsPerPage,
          skip: +page * +itemsPerPage,
        });

      return rows;
    } catch (error) {
      console.log('ProviderAgentRepository list error', error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
  
  async store(
    body: IProviderAgent
  ): Promise<ProviderAgent> {
    const connection: Connection = getConnection();
    const queryRunner: QueryRunner = connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {

      const data: ProviderAgent  = await queryRunner.manager.create(ProviderAgent, body);
      
      await queryRunner.manager.save(data);

      await queryRunner.commitTransaction();

      return data;
    } catch (error) {
      console.log('ProviderAgentRepository store error', error);
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
      const data = await queryRunner.manager.findOne(ProviderAgent, id, {
        relations: this.relations,
      });

      return data;
    } catch (error) {
      console.log('ProviderAgentRepository findOneById error', error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}

export default new ProviderAgentRepository();
