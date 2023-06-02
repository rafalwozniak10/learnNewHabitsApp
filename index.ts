import Fastify from "fastify";
import { PrismaClient } from "@prisma/client";
import { userType, taskType, IHeaders } from "type";
const server = Fastify();
const prisma = new PrismaClient();
server.get("/", async function () {
  return { status: "OK" };
});

server.post<{ Body: taskType }>("/task", async (request, reply) => {
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

server.put<{ Body: taskType }>("/task", async (request, reply) => {
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

server.delete<{ Body: taskType }>("/task", async (request, reply) => {
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
