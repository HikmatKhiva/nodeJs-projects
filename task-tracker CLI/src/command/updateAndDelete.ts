import { Command } from "commander";
import { readTasks, writeTasks } from "../utils/files.js";
export default function (program: Command): void {
  program
    .command("update <id> <description>")
    .description("task description update")
    .action(async (id: string, description: string) => {
      try {
        const tasks = await readTasks();
        const parsedId = parseInt(id);
        const find = tasks.find((t) => t.id === parsedId);
        if (!find) {
          console.log("task not found");
          return;
        }
        find.description = description;
        await writeTasks(tasks);
        console.log(`Task updated successfully (ID: ${parsedId})`);
      } catch (error) {
        console.log(error);
      }
    });
  program
    .command("delete <id>")
    .description("task delete")
    .action(async (id: string) => {
      try {
        const parsedId = parseInt(id);
        let tasks = await readTasks();
        const find = tasks.find((t) => t.id === parsedId);
        if (!find) {
          console.log("task not found");
          return;
        }
        tasks = tasks.filter((t) => t.id !== parsedId);
        writeTasks(tasks);
        console.log(`Task deleted successfully (ID: ${parsedId})`);
      } catch (error) {
        console.log(error);
      }
    });
}