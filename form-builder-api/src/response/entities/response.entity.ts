import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('form_responses')
export class FormResponse {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  formId!: number;

  @Column({
    type: 'jsonb',
  })
  answers: any;

  @CreateDateColumn()
  submittedAt!: Date;

}