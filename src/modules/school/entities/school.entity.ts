import { hashResource } from '@/core/helpers/hashing';
import { BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { SchoolAdmin } from './school-admin.entity';
import { Faculty } from './ƒaculty.entity';

@Entity()
export class School {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 120 })
  name: string;

  @Column({ type: 'varchar', length: 120, unique: true })
  domainName: string;

  @Column('text')
  password: string;

  @Column({ nullable: true })
  theme?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => SchoolAdmin, ({ school }) => school, { cascade: ['remove'] })
  admins: SchoolAdmin[];

  @OneToMany(() => Faculty, ({ school }) => school, { cascade: ['remove'] })
  faculties: Faculty[];

  @BeforeInsert()
  async setPassword(password: string) {
    const pass = password || this.password;
    this.password = await hashResource(pass);
  }
}
