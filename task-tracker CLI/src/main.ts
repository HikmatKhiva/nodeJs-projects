import { Command } from "commander";
import listCommand from "./command/list.js";
import addCommand from "./command/add.js";
import updateAndDeleteCommand from "./command/updateAndDelete.js";
import markStatusCommand from "./command/mark.js";
const program = new Command();
program
  .name("task")
  .description("Task Tracker CLI (Typescript)")
  .version("1.0.0");

listCommand(program);
addCommand(program);
updateAndDeleteCommand(program);
markStatusCommand(program);
program.parse();