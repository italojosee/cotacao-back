import { MigrationInterface, getRepository } from 'typeorm';
import { DenunciationOptionsSeed } from '../seeds';

export class DenunciationOptions1636568276754 implements MigrationInterface {
  public async up(): Promise<void> {
    await getRepository('DenunciationOptions').save(DenunciationOptionsSeed);
  }

  public async down(): Promise<void> {
    await getRepository('DenunciationOptions').remove(DenunciationOptionsSeed);
  }
}
