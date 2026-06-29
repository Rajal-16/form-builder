import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Form } from './entities/form.entity';

import { CreateFormDto } from './dto/create-form.dto';

@Injectable()
export class FormService {

  constructor(

    @InjectRepository(Form)

    private readonly formRepository: Repository<Form>,

  ) {}

  create(dto: CreateFormDto) {

    const form = this.formRepository.create(dto);

    return this.formRepository.save(form);

  }

  findAll() {

    return this.formRepository.find();

  }

  findOne(id: number) {

    return this.formRepository.findOne({

      where: { id }

    });

  }

}