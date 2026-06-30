import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ResponseService } from './response.service';
import { CreateResponseDto } from './dto/create-response.dto';
import { UpdateResponseDto } from './dto/update-response.dto';


@Controller('response')
export class ResponseController {
  constructor(private readonly responseService: ResponseService) {}

  @Post()
create(
  @Body() dto: CreateResponseDto
) {
  
  return this.responseService.create(dto);
}
}
