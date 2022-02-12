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

import {Product, Quotation} from './index';

@Entity({ name: 'QuotationProduct' })
export class QuotationProduct {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('numeric', {
    name: 'quantity'
  })
  quantity: number ;


  @OneToMany(() => Product, (product) => product.quotationProducts, {
    onDelete: 'CASCADE',
  })
  products?: Product[];

  @OneToMany(() => Quotation, (quotation) => quotation.quotationProducts, {
    onDelete: 'CASCADE',
  })
  quotations?: Quotation[];

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
