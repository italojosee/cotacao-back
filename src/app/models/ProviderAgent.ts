import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BeforeInsert
} from 'typeorm';
import { compare, hash } from 'bcrypt';

import {CompanyProvider} from './index'

@Entity({ name: 'ProviderAgent' })
export class ProviderAgent {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', {
    name: 'fullName'
  })
  fullName: string ;

  @Column('varchar', {
    name: 'password',
    select: false,
    nullable: true
  })
  password: string ;

  @Column('varchar', {
    name: 'email',
  })
  email: string;

  @Column('varchar', {
    name: 'code',
    nullable: true,
    select: false,
  })
  code?: string;

  @Column('varchar', {
    name: 'avatarUrl',
    nullable: true
  })
  avatarUrl?: string;

  @ManyToOne(() => CompanyProvider, (company) => company.agents, {
    onDelete: 'CASCADE',
  })
  companyProvider?: number | CompanyProvider;


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

  @BeforeInsert()
  async hashPassword(password?: string): Promise<string> {
    if (password) return hash(password, 10);
    this.password = await hash(this.password, 10);
    return this.password;
  }

  comparePassword(password: string) {
    return compare(password, this.password);
  }
}
