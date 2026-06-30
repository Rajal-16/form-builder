import { Injectable } from '@nestjs/common';
import { CreateResponseDto } from './dto/create-response.dto';
import { UpdateResponseDto } from './dto/update-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FormResponse } from './entities/response.entity';

@Injectable()
export class ResponseService {


  constructor(

  @InjectRepository(FormResponse)

  private responseRepository: Repository<FormResponse>

) {}


async create(dto: CreateResponseDto) {

  const response = this.responseRepository.create({

      formId: dto.formId,

      answers: dto.answers

  });

  return await this.responseRepository.save(response);

}
}
