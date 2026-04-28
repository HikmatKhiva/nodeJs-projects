#  Weather API

A simple and scalable Weather API that fetches real-time weather data from a third-party provider, caches responses using Redis, and exposes clean endpoints for clients.

---
**Project URLs:** 
* [GitHub - Weather API](https://github.com/HikmatKhiva/nodeJs-projects/tree/main/weather-API)
* [Roadmap](https://roadmap.sh/projects/weather-api-wrapper-service)


## 🚀 Features

- Fetch real-time weather data from a 3rd-party API  
- In-memory caching using Redis (with expiration)  
- Environment variable configuration  
- Error handling for invalid inputs and API failures  
- Rate limiting to prevent abuse  
- Clean and beginner-friendly project structure  

---

## 🛠️ Tech Stack

- **Backend:** Node.js / Express *
- **Caching:** Redis  
- **Rate Limiting:** express-rate-limit  
- **Environment Variables:** dotenv  

## API Endpoints
- GET /api/weather?city={cityCode}: Fetches current weather data.

- If data is available in Redis, returns source: "cache".
- If data is not in cache, fetches from API, stores in Redis, and returns source: "api".



### 1. Clone the repository
```bash
git clone https://github.com/HikmatKhiva/nodeJs-projects/tree/main/weather-API
cd weather-api

```

## 🚀 Quick Start

```bash
# project build
npm run build

#  server run
npm run start

# with docker run 
npm run docker
```