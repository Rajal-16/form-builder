import { IsNumber, IsObject } from 'class-validator';

export class CreateResponseDto {

 
  @IsNumber()
  formId!: number;

  @IsObject()
  answers!: Record<string, any>;

}