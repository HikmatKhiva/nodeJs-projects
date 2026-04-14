import fs from "fs";
import path from "path";
const articlesDir = path.join(process.cwd(), "dist/articles");
interface IArticle {
  id: number;
  title: string;
  date: Date;
  content: string;
}
interface IArticleCreate {
  title: string;
  date: Date;
  content: string;
}
export async function saveArticle(newArticle: IArticleCreate) {
  try {
    const articles = getAllArticles();
    const lastId =
      articles.length > 0 ? Math.max(...articles.map((a) => Number(a.id))) : 0;
    const newId = lastId + 1;

    const filePath = path.join(articlesDir, `${newId}.json`);

    fs.writeFileSync(
      filePath,
      JSON.stringify({ ...newArticle, id: newId }, null, 2),
    );
    return "saved successfully ";
  } catch (error) {
    throw error;
  }
}

export function getAllArticles(): IArticle[] {
  try {
    const files = fs
      .readdirSync(articlesDir)
      .filter((file) => file.endsWith(".json"));
    return files.map((file) => {
      const filePath = path.join(articlesDir, file);
      const data = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(data);
    });
  } catch (error) {
    throw error;
  }
}
export function getArticle(id: number): IArticle {
  try {
    const filePath = path.join(articlesDir, `${id}.json`);
    if (!fs.existsSync(filePath)) {
      throw new Error("Article not found");
    }
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    throw error;
  }
}

export function deleteArticle(id: number) {
  try {
    const filePath = path.join(articlesDir, `${id}.json`);
    if (!fs.existsSync(filePath)) {
      throw new Error("file not found");
    }
    fs.unlinkSync(filePath);
  } catch (error) {
    throw error;
  }
}
