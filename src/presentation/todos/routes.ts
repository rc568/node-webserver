import { Router } from "express";
import { TodosController } from "./controller";

export class TodosRoutes {
    static get routes(): Router {
        const router = Router();
        // const todosController = new TodosController()

        router.get('/', TodosController.getTodos)
        router.get('/:id', TodosController.getTodoById)
        router.post('/', TodosController.createTodo)
        router.put('/:id', TodosController.updateTodo)
        router.delete('/:id', TodosController.deleteTodo)

        return router
    }
}