import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CamposService } from './campos.service';
import { CriarCampoDto } from './dto/criar-campos.dto';
import { Campo } from './campos.entity';

@Controller('campos')
export class CamposController {
  constructor(private readonly camposService: CamposService) {}

  @Get()
  findAll() {
    return this.camposService.findAll();
  }

  @Get(':id')
  findOne(id: string) {
    return this.camposService.findOne(+id);
  }

  @Post()
  create(@Body() criarCampoDto: CriarCampoDto) {
    return this.camposService.create(criarCampoDto);
  }

  @Put(':id')
  update(@Body() updateCampoDto: Partial<Campo>, @Param('id') id: string) {
    return this.camposService.update(+id, updateCampoDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.camposService.delete(+id);
  }
}
