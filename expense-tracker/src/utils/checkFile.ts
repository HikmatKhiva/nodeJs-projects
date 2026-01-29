import { access } from "fs/promises";
export async function checkFile(path: string) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}
