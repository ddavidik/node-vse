import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto, createTodoSchema } from './dto/create-todo.dto';
import { UpdateTodoDto, updateTodoSchema } from './dto/update-todo.dto';
import { todos, Todo } from './entities/todo.entity';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq } from 'drizzle-orm';
import { TodoGateway } from './gateway/todo.gateway';

@Injectable()
export class TodoService {
  constructor(
    @Inject('drizzleDatabase') private readonly db: ReturnType<typeof drizzle>,
    private readonly todoGateway: TodoGateway,
  ) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    createTodoSchema.parse(createTodoDto);
    const [todo] = await this.db
      .insert(todos)
      .values(createTodoDto)
      .returning()
      .execute();

    this.todoGateway.emitTodoUpdate(todo);
    return todo;
  }

  async findAll(): Promise<Todo[]> {
    return this.db.select().from(todos).orderBy(todos.id).execute();
  }

  async findOne(id: number): Promise<Todo> {
    const [todo] = await this.db
      .select()
      .from(todos)
      .where(eq(todos.id, id))
      .execute();

    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }

    return todo;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    updateTodoSchema.parse(updateTodoDto);

    const [updatedTodo] = await this.db
      .update(todos)
      .set(updateTodoDto)
      .where(eq(todos.id, id))
      .returning()
      .execute();

    if (!updatedTodo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }

    this.todoGateway.emitTodoUpdate(updatedTodo);
    return updatedTodo;
  }

  async remove(id: number): Promise<void> {
    const deleteResult = await this.db
      .delete(todos)
      .where(eq(todos.id, id))
      .returning()
      .execute();

    if (deleteResult.length === 0) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }

    this.todoGateway.emitTodoUpdate({ id });
  }
}
