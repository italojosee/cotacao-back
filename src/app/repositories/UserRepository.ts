import { getConnection, Connection, QueryRunner } from 'typeorm';
import { User } from '@models';
import { IUserStore } from '@interfaces';

class UserRepository {
  relations = [];

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

  
  async findOneById(id: number) {
    const connection: Connection = getConnection();
    const queryRunner: QueryRunner = connection.createQueryRunner();

    await queryRunner.connect();

    try {
      const user = await queryRunner.manager.findOne(User, id, {
        relations: this.relations,
      });

      return user;
    } catch (error) {
      console.log('UserRepository findOneById error', error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async signIn(email: string, password: string): Promise<number | null> {
    const user: User = await this.getUserWithPassword({ email });

    const isValid = await user.comparePassword(password);

    if (isValid) return user.id;

    return null;
  }
  
  private async getUserWithPassword(query: object): Promise<User> {
    const connection: Connection = getConnection();
    const queryRunner: QueryRunner = connection.createQueryRunner();

    await queryRunner.connect();
    // @ts-ignore
    const user: User = await queryRunner.manager.findOneOrFail(User, query, {
      select: ['id', 'fullName', 'code', 'email', 'password'],
    });

    await queryRunner.release();

    return user;
  }

}

export default new UserRepository();
