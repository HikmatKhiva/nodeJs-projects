import { Command } from "commander";
import listCommand from "./commands/list.js";
import addCommand from "./commands/add.js";
import delCommand from "./commands/del.js";
import summaryCommand from "./commands/summary.js";
const program = new Command();

program.name("expense").description("Expense Tracker CLI").version("1.0.0");

listCommand(program);
addCommand(program);
delCommand(program);
summaryCommand(program);
program.parse(process.argv);
