import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Department } from './department.entity';
import { School } from './school.entity';
import { Venue } from './venue.entity';

@Entity()
export class Faculty {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 120 })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Department, ({ faculty }) => faculty, { cascade: ['remove'] })
  departments: Department[];

  @OneToMany(() => Venue, ({ faculty }) => faculty, { cascade: ['remove'] })
  venues: Venue[];

  @ManyToOne(() => School, ({ faculties }) => faculties)
  school: School;
}
