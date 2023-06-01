"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const client_1 = require("@prisma/client");
//import userRoutes from "src/user";
const server = (0, fastify_1.default)();
const prisma = new client_1.PrismaClient();
server.get("/", async function () {
    return { status: "OK" };
});
server.post("/login", async (request, reply) => {
    const { name, password, tasks } = request.query;
    const taskData = tasks
        ? tasks.map((task) => {
            return { Task: task.task, IsDone: task.IsDone || undefined };
        })
        : [];
    const result = await prisma.user.create({
        data: {
            name,
            password,
        },
    });
    return result;
});
server.post;
//server.register(userRoutes, { prefix: "api/users" });
server.listen({ port: 3000 }, function (err, address) {
    if (err) {
        server.log.error(err);
        process.exit(1);
    }
    console.log(`Server ready at http://localhost:3000`);
});
