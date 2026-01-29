import { Command } from "commander";
import { readDB } from "../utils/db.js";
export default function (program: Command): void {
  program.command("list").action(async () => {
    try {
      const list = await readDB();
      if (list?.length === 0) {
        console.log("# No expenses found");
        return;
      }
      // Header
      console.log("# ID  Date       Description  Amount");
      console.log("# -----------------------------------");
      list.forEach((list: Expense) => {
        console.log(
          `# ${list.id.toString().padStart(2)}  ${list.date}  ${list.description.padEnd(12)}  $${list.amount}`,
        );
      });
    } catch (error) {
      console.log(error);
    }
  });
}