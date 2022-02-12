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

import {QuotationProvider, QuotationProduct, User} from './index';

@Entity({ name: 'Quotation' })
export class Quotation {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', {
    name: 'description'
  })
  description: string ;

  @Column('timestamp', {
    name: 'dateInit'
  })
  dateInit: Date ;

  @Column('timestamp', {
    name: 'dateEnd'
  })
  dateEnd: Date ;

  @ManyToOne(() => User, (user) => user.quotations, {
    onDelete: 'CASCADE',
  })
  responsible?: User[];

  @ManyToOne(() => QuotationProduct, (quotationProduct) => quotationProduct.quotations, {
    onDelete: 'CASCADE',
  })
  quotationProducts?: QuotationProduct[];

  @ManyToOne(() => QuotationProvider, (quotationProvider) => quotationProvider.quotations, {
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
