import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TodoGateway } from './gateway/todo.gateway';

@Module({
  imports: [DatabaseModule],
  controllers: [TodoController],
  providers: [TodoService, TodoGateway],
})
export class TodoModule {}
