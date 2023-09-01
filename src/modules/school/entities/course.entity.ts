import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Department } from './department.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 120 })
  title: string;

  @Column({ type: 'varchar', length: 120 })
  code: string;

  @Column()
  noOfStudents: number;

  @Column({ type: 'timestamp' })
  lastTimeAllocated?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Department, ({ id }) => id)
  belongsTo: Department;

  @ManyToMany(() => Department, { cascade: ['remove'] })
  @JoinTable()
  departmentsOffering: Department[];
}
