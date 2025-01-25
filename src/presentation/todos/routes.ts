import { Router } from "express";
import { TodosController } from "./controller";
import { TodoDatasourceImpl } from "../../infrasctructure/datasource/todo.datasource.impl";
import { TodoRepositoryImpl } from "../../infrasctructure/repositories/todo.repository.impl";

export class TodosRoutes {
    static get routes(): Router {
        const router = Router();

        // Aquí se cambia de dataSource (mongodb, redis, mysql, ...)
        const datasource = new TodoDatasourceImpl()
        const todoRepository = new TodoRepositoryImpl(datasource)

        const todosController = new TodosController(todoRepository)

        router.get('/', todosController.getTodos)
        router.get('/:id', todosController.getTodoById)
        router.post('/', todosController.createTodo)
        router.put('/:id', todosController.updateTodo)
        router.delete('/:id', todosController.deleteTodo)

        return router
    }
}