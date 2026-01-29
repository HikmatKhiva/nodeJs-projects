import { Command } from "commander";
import { readDB, writeDB } from "../utils/db.js";
export default function (program: Command) {
  program
    .command("add")
    .description("Add a new expense")
    .requiredOption("--description <text>", "Expense description")
    .requiredOption("--amount <number>", "Expense amount", parseFloat)
    .action(async ({ amount, description }: OptionsAdd) => {
      try {
        if (!amount || !description) {
          throw new Error("description and amount required");
        }
        const list = await readDB();
        let lastId = list[list.length - 1]?.id;
        const id = lastId ? lastId + 1 : list.length + 1;
        const newExpense = {
          id,
          description,
          amount,
          date: new Date().toISOString().split("T")[0],
        };
        list.push(newExpense);
        await writeDB(list);
        console.log(`Expense added successfully (ID: ${id})`);
      } catch (error) {
        console.error(
          "Invalid command " +
            (error instanceof Error ? error.message : "Unknown error"),
        );
      }
    });
}
