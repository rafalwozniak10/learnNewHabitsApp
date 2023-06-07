export interface userType {
  name: string;
  password: string;
}

export interface taskType {
  id: number;
  taskToDo: string;
  date: string;
  isDone: boolean;
  taskListId: number;
}

export interface taskListType {
  id: number;
  name: string;
  task: taskType;
}

export interface IHeaders {
  "x-access-token": string;
}
