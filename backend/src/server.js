import express from "express";
import pg from "pg";

const { Pool } = pg;
const app = express();

const port = Number(process.env.PORT || 3000);

const pool = new Pool({
  host: process.env.DB_HOST || "db",
  port: Number(process.env.DB_PORT || 5432),
  database: process.env.DB_NAME || "appdb",
  user: process.env.DB_USER || "appuser",
  password: process.env.DB_PASSWORD || "change-me-locally",
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000
});

app.disable("x-powered-by");
app.use(express.json());

app.get("/api/health", async (_req, res) => {
  try {
    const result = await pool.query("SELECT NOW() AS database_time");
    res.json({
      status: "ok",
      service: "backend",
      database: "connected",
      databaseTime: result.rows[0].database_time
    });
  } catch (error) {
    res.status(503).json({
      status: "degraded",
      service: "backend",
      database: "unavailable"
    });
  }
});

app.get("/api", (_req, res) => {
  res.json({
    message: "Week 4 Docker multi-container application",
    architecture: ["frontend", "backend", "postgresql"]
  });
});

const server = app.listen(port, "0.0.0.0", () => {
  console.log(`Backend listening on port ${port}`);
});

const shutdown = async (signal) => {
  console.log(`${signal} received; shutting down`);
  server.close(async () => {
    await pool.end();
    process.exit(0);
  });
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
