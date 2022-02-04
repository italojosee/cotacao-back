import { getRepository, MigrationInterface } from 'typeorm';
import { OccupationTypesSeed } from '../seeds';

export class OccupationTypesSeed1633546113563 implements MigrationInterface {
  public async up(): Promise<void> {
    await getRepository('OccupationTypes').save(OccupationTypesSeed);
  }

  public async down(): Promise<void> {
    await getRepository('OccupationTypes').remove(OccupationTypesSeed);
  }
}
