import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  picture: string;

  @Column()
  price: number;

  @Column()
  category: string;

  @Column()
  inventory: number;

  @Column()
  description: string;
}