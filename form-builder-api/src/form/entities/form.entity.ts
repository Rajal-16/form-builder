import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('forms')
export class Form {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  formName!: string;

  @Column()
  branch!: string;

  @Column({ nullable: true })
  logoUrl!: string;

  @Column()
  section!: string;

  @Column({ nullable: true })
  responsibleUser!: string;

  @Column()
  status!: string;

  @Column()
  buttonName!: string;

  @Column({ nullable: true })
  academicYear!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @Column({ type: 'text' })
  successMessage!: string;

  @Column({ type: 'text' })
  confirmMessage!: string;

  @Column({
    type: 'jsonb',
  })
  fields!: any;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}