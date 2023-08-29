import { hashResource } from '@/core/helpers/hashing';
import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { School } from './school.entity';

@Entity()
export class SchoolAdmin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 120 })
  fullname: string;

  @Column({ type: 'varchar', length: 120, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => School, ({ admins }) => admins)
  school: School;

  @BeforeInsert()
  async setPassword(password: string) {
    const pass = password || this.password;
    this.password = await hashResource(pass);
  }
}
