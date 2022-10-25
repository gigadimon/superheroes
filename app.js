const express = require("express");
const logger = require("morgan");
const cors = require("cors/lib");
const { HeroError } = require("./errors/heroErrors");

const heroesRouter = require("./routes/api/heroes");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/heroes", heroesRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.use((err, req, res, next) => {
  if (err instanceof HeroError) {
    return res.status(err.status).json({ error: err.message });
  }
  return res.status(500).json({ error: err.message });
});

module.exports = app;
