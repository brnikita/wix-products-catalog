import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  sku: number;

  @Column()
  picture: string;

  @Column('float')
  price: number;

  @Column()
  inventory: number;

  @Column()
  description: string;
}