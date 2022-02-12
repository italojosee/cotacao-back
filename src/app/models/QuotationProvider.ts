import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  JoinTable,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BeforeInsert
} from 'typeorm';

import {CompanyProvider, ProviderAgent, Quotation} from './index';

@Entity({ name: 'QuotationProvider' })
export class QuotationProvider {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('numeric', {
    name: 'quantity'
  })
  quantity: string ;


  @OneToMany(() => CompanyProvider, (provider) => provider.quotationProviders, {
    onDelete: 'CASCADE',
  })
  providers?: CompanyProvider[];

  @OneToMany(() => Quotation, (quotation) => quotation.quotationProviders, {
    onDelete: 'CASCADE',
  })
  quotations?: Quotation[];

  @ManyToOne(() => ProviderAgent, (quotation) => quotation.quotationProviders, {
    onDelete: 'CASCADE',
  })
  agent?: ProviderAgent;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
  })
  updatedAt: Date;
}
