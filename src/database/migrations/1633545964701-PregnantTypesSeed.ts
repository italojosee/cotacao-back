import { getRepository, MigrationInterface } from 'typeorm';
import { PregnantTypesSeed } from '../seeds';

export class PregnantTypesSeed1633545964701 implements MigrationInterface {
  public async up(): Promise<void> {
    await getRepository('PregnantTypes').save(PregnantTypesSeed);
  }

  public async down(): Promise<void> {
    await getRepository('PregnantTypes').remove(PregnantTypesSeed);
  }
}
