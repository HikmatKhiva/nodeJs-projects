import { Command } from "commander";
import { readTasks } from "../utils/files.js";
import { Task } from "../types/task.js";
export const getIcon = (status: string): string => {
  switch (status) {
    case "done":
      return "✔";
    case "in-progress":
      return "⏳";
    case "todo":
      return "📋";
    default:
      return "📋";
  }
};
const displayTasks = (tasks: Task[]): void => {
  if (!tasks.length) {
    console.log("No task found");
    return;
  }
  tasks.forEach((item: Task, i) => {
    const icon = getIcon(item.status);
    console.log(`${i + 1}. ${icon} ${item.description}`);
  });
};
export default function (program: Command): void {
  const list = program.command("list").description("List Task");
  list.command("done").action(async () => {
    const tasks = (await readTasks()).filter((t) => t.status === "done");
    displayTasks(tasks);
  });
  list.command("todo").action(async () => {
    const tasks = (await readTasks()).filter((t) => t.status === "todo");
    displayTasks(tasks);
  });
  list.command("in-progress").action(async () => {
    const tasks = (await readTasks()).filter((t) => t.status === "in-progress");
    displayTasks(tasks);
  });
  list.action(async () => {
    const tasks = await readTasks();
    displayTasks(tasks);
  });
}