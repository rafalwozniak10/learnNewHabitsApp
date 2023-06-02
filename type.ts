export interface userType {
  name: string;
  password: string;
}

export interface taskType {
  taskToDo: string;
  isDone: boolean;
  daysInRow: number;
}

export interface IHeaders {
  "x-access-token": string;
}
