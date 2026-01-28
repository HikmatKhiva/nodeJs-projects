import { access } from "fs/promises";
export async function checkFile(file: string) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}