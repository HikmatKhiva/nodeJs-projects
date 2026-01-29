import { Command } from "commander";
import { readDB } from "../utils/db.js";
import { monthName } from "../utils/date.js";
export default function (program: Command) {
  program
    .command("summary")
    .option("--month <number>", "Filter by month (1-12)", Number)
    .action(async ({ month }: OptionsSummary) => {
      if (month < 1 || month > 12) {
        throw new Error("Month must be between 1 and 12");
      }
      try {
        const list = await readDB();
        let filtered = list;
        if (month) {
          filtered = list.filter((expense: Expense) => {
            const expenseMonth = new Date(expense.date).getMonth() + 1;
            return month === expenseMonth;
          });
        }
        const total = filtered.reduce((acc: number, exp: Expense) => {
          return acc + exp.amount;
        }, 0);
        if (month) {
          console.log(`Total expenses for ${monthName(month)}: $${total}`);
          return;
        }
        console.log(`# Total expenses: $${total}`);
      } catch (error) {
        console.error(
          "Invalid command " +
            (error instanceof Error ? error.message : "Unknown error"),
        );
      }
    });
}
