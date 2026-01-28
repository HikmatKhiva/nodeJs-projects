import { Command } from "commander";
import { readTasks, writeTasks } from "../utils/files.js";
export default function (program: Command) {
  program.command("mark-in-progress <id>").action(async (id: string) => {
    try {
      const parsedId = parseInt(id);
      const tasks = await readTasks();
      const find = tasks.find((t) => t.id === parsedId);
      if (!find) {
        console.log("task not found");
        return;
      }
      find.status = "in-progress";
      await writeTasks(tasks);
        console.log(`Task updated successfully (ID: ${parsedId})`);
    } catch (error) {
      console.log(error);
    }
  });
  program.command("mark-done <id>").action(async (id: string) => {
    try {
      const parsedId = parseInt(id);
      const tasks = await readTasks();
      const find = tasks.find((t) => t.id === parsedId);
      if (!find) {
        console.log("task not found");
        return;
      }
      find.status = "done";
      await writeTasks(tasks);
        console.log(`Task updated successfully (ID: ${parsedId})`);
    } catch (error) {
      console.log(error);
    }
  });
}
