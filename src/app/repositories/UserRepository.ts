import { getConnection, Connection, QueryRunner } from 'typeorm';
import { User } from '@models';
import { IUserStore } from '@interfaces';

class UserRepository {

  async list(
    page: number,
    itemsPerPage: number
  ): Promise<object> {
    const connection: Connection = getConnection();
    const queryRunner: QueryRunner = connection.createQueryRunner();

    await queryRunner.connect();

    try {
      const users = await queryRunner.manager.find(User, {
          order: {
            createdAt: 'ASC',
          },
          take: +itemsPerPage,
          skip: +page * +itemsPerPage,
        });

      return users;
    } catch (error) {
      console.log('UserRepository list error', error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
  async store(
    body: IUserStore
  ): Promise<User> {
    const connection: Connection = getConnection();
    const queryRunner: QueryRunner = connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {

      const user: User  = await queryRunner.manager.create(User, body);
      
      await queryRunner.manager.save(user);

      await queryRunner.commitTransaction();
      
      delete user.password;

      return user;
    } catch (error) {
      console.log('UserRepository list error', error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

}

export default new UserRepository();
