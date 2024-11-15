import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Statistic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  carsCount: number;

  @Column('double precision', { default: 0 })
  maxPrice: number;

  @Column('double precision', { default: 0 })
  avgPrice: number;

  @Column('double precision', { default: 0 })
  minPrice: number;
}
