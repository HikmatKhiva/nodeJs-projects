import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { checkFile } from "./checkFile.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FILE = path.join(__dirname, "../../db/db.json");
export async function readDB(): Promise<Expense[]> {
  try {
    const data = await fs.readFile(FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}
export async function writeDB(expenses: Expense[]): Promise<void> {
  if (!(await checkFile(FILE))) return;
  try {
    const json = JSON.stringify(expenses);
    await fs.writeFile(FILE, json);
  } catch (error) {
    console.log(error);
  }
}