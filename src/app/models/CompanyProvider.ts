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

import {ProviderAgent, QuotationProvider} from './index';

@Entity({ name: 'CompanyProvider' })
export class CompanyProvider {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', {
    name: 'name'
  })
  name: string ;

  @Column('varchar', {
    name: 'cnpj',
    unique: true
  })
  cnpj: string ;

  @Column('varchar', {
    name: 'logoUrl',
    nullable: true,
    default: null
  })
  logoUrl?: string ;

  @OneToMany(() => ProviderAgent, (userGroups) => userGroups.companyProvider, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  agents?: ProviderAgent[];

  @OneToMany(() => QuotationProvider, (quotationProvider) => quotationProvider.providers, {
    onDelete: 'CASCADE',
  })
  quotationProviders?: QuotationProvider[];

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
