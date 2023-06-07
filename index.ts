import Fastify from "fastify";
import cors from "@fastify/cors";
import { PrismaClient, TaskList } from "@prisma/client";
import { userType, taskType, IHeaders, taskListType } from "type";
const server = Fastify();
const prisma = new PrismaClient();

server.register(cors, {
  origin: ["*"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
});

server.get<{ Body: taskListType }>("/tasklist", async (request, reply) => {
  const taskLists = await prisma.taskList.findMany({
    include: {
      task: true,
    },
  });
  reply.send(taskLists);
  reply.header("Access-Control-Allow-Origin", true);
  reply.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  reply.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
});

server.get<{ Params: { startDate: Date } }>(
  "/getweek/:startDate",
  async (request, reply) => {
    const { startDate } = request.params;
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6);
    const taskLists = await prisma.taskList.findMany({
      include: {
        task: {
          where: {
            date: {
              gte: new Date(startDate),
              lte: endDate,
            },
          },
        },
      },
    });
    reply.send(taskLists);
  }
);

server.post<{ Body: taskType }>("/task", async (request, reply) => {
  const { id, taskToDo, isDone, taskListId, date } = request.body;

  const task = await prisma.task.create({
    data: {
      isDone: isDone,
      taskListId: taskListId,
      date,
    },
  });
  reply.send(task);
});

server.put<{ Body: taskType; Params: taskType }>(
  "/task/:id",
  async (request, reply) => {
    const { isDone } = request.body;
    const { id } = request.params;

    const taskDone = await prisma.task.update({
      where: { id: Number(id) },
      data: {
        isDone,
      },
    });
    reply.send(taskDone);
  }
);

server.post<{ Body: { name: string } }>("/tasklist", async (request, reply) => {
  const { name } = request.body;
  const tasklist = await prisma.taskList.create({
    data: {
      name,
    },
  });
  reply.send(tasklist);
});

server.put<{ Params: taskListType; Body: { name: string } }>(
  "/task-update/:id",
  async (request, reply) => {
    const { id } = request.params;
    const { name } = request.body;

    const taskUpdate = await prisma.taskList.update({
      where: { id: Number(id) },
      data: {
        name,
      },
    });
    reply.send(taskUpdate);
  }
);

server.delete<{ Params: { id: number } }>(
  "/tasklist/:id",
  async (request, reply) => {
    const { id } = request.params;

    await prisma.taskList.delete({
      where: { id: Number(id) },
    });
    reply.send("Task removed");
  }
);

// server.post<{ Body: userType }>("/user", async (request, reply) => {
//   const { name, password } = request.body;

//   const user = await prisma.name.create({
//     data: {
//       name,
//       password,
//     },
//   });
//   reply.send(user);
// });

server.listen({ port: 5000 }, function (err, address) {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  console.log(`Server ready at http://localhost:3000`);
});
