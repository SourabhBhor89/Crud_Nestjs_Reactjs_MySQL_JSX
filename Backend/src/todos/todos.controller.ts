import { Body, Controller, Delete, Get, Param, Post, Put, NotFoundException } from "@nestjs/common";
import { TodosService } from "./todos.service";
import { CreateTodoDto } from "./dtos/create-todo.dto";

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() dto: CreateTodoDto) {
    return this.todosService.create(dto);
  }

  @Get()
  findMany() {
    return this.todosService.findMany();
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() dto: CreateTodoDto) {
    const updatedTodo = await this.todosService.update(id, dto);
    if (!updatedTodo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return updatedTodo;
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    const result = await this.todosService.delete(id);
    if (!result) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return { message: 'Todo deleted successfully' };
  }
}
