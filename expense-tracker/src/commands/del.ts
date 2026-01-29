import { Command } from "commander";
import { readDB, writeDB } from "../utils/db.js";

export default function (program: Command) {
  program
    .command("delete")
    .description("expense delete")
    .requiredOption("--id <id>", "Expense id", parseFloat)
    .action(async ({ id }: OptionsDelete) => {
      try {
        let list = await readDB();
        const item = list.find((expense: Expense) => expense.id === id);
        if (!item) {
          console.warn("Expense not found!");
          return;
        }
        list = list.filter((expense: Expense) => expense.id !== id);
        await writeDB(list);
        console.log("Expense delete successfully");
      } catch (error) {
        console.error(
          "Invalid command " +
            (error instanceof Error ? error.message : "Unknown error"),
        );
      }
    });
}
