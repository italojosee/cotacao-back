import { getRepository, MigrationInterface } from 'typeorm';
import { GroupTypes } from '../seeds';

export class GroupType1634574500166 implements MigrationInterface {
  public async up(): Promise<void> {
    await getRepository('GroupTypes').save(GroupTypes);
  }

  public async down(): Promise<void> {
    await getRepository('GroupTypes').remove(GroupTypes);
  }
}
