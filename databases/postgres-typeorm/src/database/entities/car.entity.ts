import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  mark: string;

  @Column({ default: 0 })
  horses: number;

  @Column({ default: 0 })
  price: number;

  @Column('float', { nullable: true })
  lat: number;

  @Column('float', { nullable: true })
  long: number;

  @ManyToOne(() => Category, (category) => category.cars)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Column('int', { nullable: false })
  categoryId: number;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null;
}
