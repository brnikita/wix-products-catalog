import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column('float', { nullable: true })
  price?: number;

  @Column({ nullable: true })
  sku?: string;

  @Column({ nullable: true })
  inventory?: number;

  @Column({ nullable: true })
  picture?: string;

  @Column('json', { nullable: true })
  media?: { src: string; title?: string }[];

  @Column({ nullable: true })
  productType?: string;

  @Column({ nullable: true })
  brand?: string;

  @Column({ nullable: true })
  ribbon?: string;

  @Column('json', { nullable: true })
  variants?: {
    options: { [key: string]: string };
    sku?: string;
    price?: number;
    inventory?: number;
  }[];
}