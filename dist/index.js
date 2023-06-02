"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const client_1 = require("@prisma/client");
const server = (0, fastify_1.default)();
const prisma = new client_1.PrismaClient();
server.get("/", async function () {
    return { status: "OK" };
});
server.post("/task", async (request, reply) => {
    const { taskToDo, isDone, daysInRow } = request.body;
    const task = await prisma.task.create({
        data: {
            taskToDo,
            isDone,
            daysInRow,
        },
    });
    reply.send(task);
});
server.put("/task", async (request, reply) => {
    const { taskToDo, isDone, daysInRow } = request.params;
    const task = await prisma.task.update({
        data: {
            taskToDo,
            isDone,
            daysInRow,
        },
    });
    reply.send(task);
});
server.delete("/task", async (request, reply) => {
    const { taskToDo, isDone, daysInRow } = request.params;
    const task = await prisma.task.delete({
        data: {
            taskToDo,
            isDone,
            daysInRow,
        },
    });
    reply.send(task);
});
server.listen({ port: 3000 }, function (err, address) {
    if (err) {
        server.log.error(err);
        process.exit(1);
    }
    console.log(`Server ready at http://localhost:3000`);
});
