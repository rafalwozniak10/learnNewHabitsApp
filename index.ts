import Fastify from "fastify";
import { PrismaClient } from "@prisma/client";
//import userRoutes from "src/user";

const server = Fastify();
const prisma = new PrismaClient();
server.get("/", async function () {
  return { status: "OK" };
});

interface IQueryString {
  name: string;
  password: string;
  tasks: string[];
}

server.post<{ Querystring: IQueryString }>("/login", async (request, reply) => {
  const { name, password, tasks } = request.query;

  const taskData = tasks
    ? tasks.map((task: any) => {
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
