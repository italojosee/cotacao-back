import { getRepository, MigrationInterface } from 'typeorm';
import { JoinTypesSeed } from '../seeds';

export class JoinTypesSeed1633546119928 implements MigrationInterface {
  public async up(): Promise<void> {
    await getRepository('JoinTypes').save(JoinTypesSeed);
  }

  public async down(): Promise<void> {
    await getRepository('JoinTypes').remove(JoinTypesSeed);
  }
}
