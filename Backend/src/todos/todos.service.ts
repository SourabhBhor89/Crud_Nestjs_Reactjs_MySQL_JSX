import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTodoDto } from "./dtos/create-todo.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Todo } from "./todos.entity";
import { Repository } from "typeorm";

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
  ) {}

  async create(dto: CreateTodoDto) {
    const todo = this.todoRepository.create(dto);
    return await this.todoRepository.save(todo);
  }

  async findMany() {
    return await this.todoRepository.find();
  }

  async update(id: number, dto: CreateTodoDto) {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    Object.assign(todo, dto);
    return await this.todoRepository.save(todo);
  }

  async delete(id: number) {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return await this.todoRepository.remove(todo);
  }
}
