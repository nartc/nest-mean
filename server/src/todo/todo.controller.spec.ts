import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';

describe('Todo Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [TodoController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: TodoController = module.get<TodoController>(TodoController);
    expect(controller).toBeDefined();
  });
});
