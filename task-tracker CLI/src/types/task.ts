export type TaskStatus = "todo" | "done" | "in-progress";

export interface Task {
  id: number;
  description: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
}
