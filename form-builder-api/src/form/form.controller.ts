import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';

import { CreateFormDto } from './dto/create-form.dto';

import { FormService } from './form.service';

@Controller('forms')
export class FormController {

  constructor(

    private readonly formService: FormService

  ) {}

  @Post()

  create(@Body() dto: CreateFormDto) {

    return this.formService.create(dto);

  }

  @Get()

  findAll() {

    return this.formService.findAll();

  }

  @Get(':id')

  findOne(

    @Param('id', ParseIntPipe)

    id: number,

  ) {

    return this.formService.findOne(id);

  }

}