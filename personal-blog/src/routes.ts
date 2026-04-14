import { Router } from "express";
import {
  deleteArticle,
  getAllArticles,
  getArticle,
  saveArticle,
} from "./helper/helper.js";
import { adminMiddleware } from "./middleware.js";
export const appRouter = Router();
const adminUsername = "admin";
const adminPassword = "1234";
// home page
appRouter.get("/", async (req, res, next) => {
  try {
    const page = Number(req?.query?.page) || 1;
    const limit = Number(req?.query?.limit) || 8;
    const offset = (page - 1) * limit;
    const articles = getAllArticles();
    const pageArticles = articles.slice(offset, offset + limit);
    const totalPages = Math.ceil(articles.length / limit);
    res.render("index", {
      articles: pageArticles,
      currentPage: page,
      totalPages,
    });
  } catch (error) {
    next(error);
  }
});
// articles routes
appRouter.get("/articles/:id", (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const article = getArticle(id);
    res.render("article", { article });
  } catch (error) {
    next(error);
  }
});
// admin routes
appRouter.get("/admin/auth", (req, res, next) => {
  try {
    res.render("admin/pageLogin", { error: null });
  } catch (error) {
    next(error);
  }
});
appRouter.get("/admin/new", adminMiddleware, (req, res, next) => {
  try {
    res.render("admin/pageCreate");
  } catch (error) {
    next(error);
  }
});
appRouter.get("/admin/edit/:id", adminMiddleware, (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const article = getArticle(id);
    res.render("admin/pageEdit", { article });
  } catch (error) {
    next(error);
  }
});
appRouter.post("/admin/delete/:id", adminMiddleware, (req, res, next) => {
  try {
    const id = Number(req.params.id);
    deleteArticle(id);
    res.redirect("/admin");
  } catch (error) {
    next(error);
  }
});
appRouter.post("/admin/new", adminMiddleware, (req, res, next) => {
  try {
    const { title, content, date } = req.body;
    saveArticle({ title, content, date });
    return res.redirect("/admin");
  } catch (error) {
    next(error);
  }
});
appRouter.get("/admin", adminMiddleware, (req, res, next) => {
  try {
    const page = Number(req?.query?.page) || 1;
    const limit = Number(req?.query?.limit) || 8;
    const offset = (page - 1) * limit;
    const articles = getAllArticles();
    const pageArticles = articles.slice(offset, offset + limit);
    const totalPages = Math.ceil(articles.length / limit);
    res.render("admin/pageAdmin", {
      articles: pageArticles,
      currentPage: page,
      totalPages,
      isAdmin: true,
    });
  } catch (error) {
    next(error);
  }
});
appRouter.post("/admin/login", (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (username === adminUsername && password === adminPassword) {
      res.cookie("admin", "true", {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });
      return res.redirect("/admin");
    }
    res
      .status(401)
      .render("admin/pageLogin", { error: "Invalid login or password!" });
  } catch (error) {
    next(error);
  }
});
appRouter.post("/admin/logout", (req, res, next) => {
  try {
    res.clearCookie("admin");
    res.redirect("/");
  } catch (error) {
    next(error);
  }
});
