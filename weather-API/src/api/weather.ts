import { Request, Response } from "express";
import dotenv from "dotenv";
import redis from "../lib/redis.js";
dotenv.config();
const API_KEY = process.env.API_KEY;
export const getWeather = async (req: Request, res: Response) => {
  try {
    const city = req.query.city;

    if (!city || typeof city !== "string") {
      return res.status(400).json({ error: "City is required" });
    }
    const cachedKey = `weather:${city.toLowerCase()}`;
    const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`;

    const cached = await redis.get(cachedKey);
    if (cached) {
      return res
        .status(200)
        .json({ source: "cache", data: JSON.parse(cached) });
    }
    if (!API_KEY) {
      return res.status(500).json({ error: "API key not configured" });
    }
    const response = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (!response.ok) {
      return res.status(response.status).json({
        error: "Failed to fetch weather data",
      });
    }
    const data = (await response.json()) as WeatherApiResponse;
    // WeatherAPI sometimes returns errors inside JSON
    if (data?.error) {
      return res.status(400).json({ error: data.error.message });
    }
    await redis.setEx(cachedKey, 600, JSON.stringify(data));

    res.status(200).json({ source: "api", data: data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};
