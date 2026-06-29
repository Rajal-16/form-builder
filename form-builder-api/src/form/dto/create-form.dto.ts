import {
  IsArray,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateFormDto {

  @IsString()
  formName!: string;

  @IsString()
  branch!: string;

  @IsOptional()
  @IsString()
  logoUrl?: string;

  @IsString()
  section!: string;

  @IsOptional()
  @IsString()
  responsibleUser?: string;

  @IsString()
  status!: string;

  @IsString()
  buttonName!: string;

  @IsOptional()
  @IsString()
  academicYear?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  successMessage!: string;

  @IsString()
  confirmMessage!: string;

  @IsArray()
  fields!: any[];
}