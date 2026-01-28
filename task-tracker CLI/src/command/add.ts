import { Command } from "commander";
import { readTasks, writeTasks } from "../utils/files.js";
import { Task } from "../types/task.js";
export default function (program: Command): void {
  program
    .command("add <description>")
    .description("add a task")
    .action(async (description: string) => {
      try {
        const tasks = await readTasks();
        const id = tasks.length + 1;
        const task: Task = {
          id,
          description,
          createdAt: new Date(),
          updatedAt: new Date(),
          status: "todo",
        };
        tasks.push(task);
        await writeTasks(tasks);
        console.log(`Task added successfully (ID: ${id})`);
      } catch (error) {
        console.log(error);
      }
    });
}