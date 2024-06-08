import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto, createTodoSchema } from './dto/create-todo.dto';
import { updateTodoSchema, UpdateTodoDto } from './dto/update-todo.dto';
import { ZodPipe } from '../pipe/zodPipe';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async create(@Body(new ZodPipe(createTodoSchema)) body: CreateTodoDto) {
    return this.todoService.create(body);
  }

  @Get()
  async findAll() {
    return this.todoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.todoService.findOne(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(new ZodPipe(updateTodoSchema)) body: UpdateTodoDto,
  ) {
    return this.todoService.update(+id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}
