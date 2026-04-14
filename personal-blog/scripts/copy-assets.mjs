import { cp } from "fs/promises";
import { join } from "path";
import fs from "fs";
const rootDir = process.cwd();
async function copy() {
  try {
    const articlesDir = join(rootDir, "dist/articles");
    if (!fs.existsSync(articlesDir)) {
      fs.mkdirSync(articlesDir);
    }
    await cp(join(rootDir, "src/views"), join(rootDir, "dist/views"), {
      recursive: true,
    });
    await cp(join(rootDir, "public"), join(rootDir, "dist/public"), {
      recursive: true,
    });
    console.log("assets copied successfully");
  } catch (error) {
    console.log("assets copied failed", error?.message);
  }
}
copy();
