import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BeforeInsert
} from 'typeorm';

import { QuotationProduct } from './index';

@Entity({ name: 'Product' })
export class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', {
    name: 'name'
  })
  name: string ;

  @Column('decimal', {
    name: 'price',
    default: 0
  })
  price: number ;

  @Column('varchar', {
    name: 'sku',
    nullable: true
  })
  sku?: string ;

  @Column('varchar', {
    name: 'image',
    nullable: true
  })
  image?: string;


  @ManyToOne(() => QuotationProduct, (quotationProduct) => quotationProduct.products, {
    onDelete: 'CASCADE',
  })
  quotationProducts?: QuotationProduct[];

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
