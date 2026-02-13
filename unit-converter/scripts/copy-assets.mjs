import { cp } from "fs/promises";
import { join } from "path";

const rootDir = process.cwd(); // your project root

async function copy() {
  // adjust these paths if views/static are inside src/
  await cp(join(rootDir, "src/views"), join(rootDir, "dist/views"), { recursive: true });
  await cp(join(rootDir, "src/static"), join(rootDir, "dist/static"), { recursive: true });

  console.log("Assets copied successfully");
}

copy().catch(console.error);
