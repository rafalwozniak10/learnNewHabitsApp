/*
  Warnings:

  - You are about to drop the column `task` on the `Task` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "isDone" BOOLEAN NOT NULL,
    "taskListId" INTEGER NOT NULL,
    CONSTRAINT "Task_taskListId_fkey" FOREIGN KEY ("taskListId") REFERENCES "taskList" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Task" ("createdAt", "id", "isDone", "taskListId", "updatedAt") SELECT "createdAt", "id", "isDone", "taskListId", "updatedAt" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
CREATE TABLE "new_taskList" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'www'
);
INSERT INTO "new_taskList" ("createdAt", "id", "updatedAt") SELECT "createdAt", "id", "updatedAt" FROM "taskList";
DROP TABLE "taskList";
ALTER TABLE "new_taskList" RENAME TO "taskList";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
