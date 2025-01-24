import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto } from "../../domain/dtos";
import { UpdateTodoDto } from "../../domain/dtos/todos/update-todo.dto";

export class TodosController {

    // * DI
    constructor() { }

    static getTodos = async (req: Request, res: Response) => {
        const todos = await prisma.todo.findMany()
        res.json(todos)
    }

    static getTodoById = async (req: Request, res: Response) => {
        const id = +req.params.id
        if (isNaN(id)) return res.status(404).json({ error: `id is invalid` })
        const todo = await prisma.todo.findUnique({
            where: {
                id: id
            }
        })

        if (!todo) return res.status(404).json({ error: `Todo with id: ${id} not found.` })
        res.json(todo)
    }

    static createTodo = async (req: Request, res: Response) => {
        const [err, createTodoDto] = CreateTodoDto.create(req.body)
        if (err) return res.status(400).json({ err })

        const todo = await prisma.todo.create({
            data: createTodoDto!
        });

        res.json(todo)
    }

    static updateTodo = async (req: Request, res: Response) => {
        const id = +req.params.id
        const [error, updateTodoDto] = UpdateTodoDto.create({
            id,
            ...req.body
        })

        if (error) return res.status(404).json({ error })

        const todo = await prisma.todo.findUnique({
            where: { id }
        })

        if (!todo) return res.status(404).json({ error: `Todo with id: ${id} not found.` })

        const updatedTodo = await prisma.todo.update({
            where: { id },
            data: updateTodoDto!.values
        })

        res.json(updatedTodo)
    }

    static deleteTodo = async (req: Request, res: Response) => {
        const id = +req.params.id
        if (isNaN(id)) return res.status(404).json({ error: `id is invalid` })

        const todo = await prisma.todo.findUnique({
            where: { id }
        })
        if (!todo) return res.status(404).json({ error: `Todo with id: ${id} not found.` })

        const deleted = await prisma.todo.delete({
            where: { id }
        })

        res.json(deleted)

    }
}