import dotenv from "dotenv";

dotenv.config();

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { swaggerSpec, swaggerUi } from "../config/swagger.js";
import vectorEndpoints from "./routes/vectorEndpoints.js";
import healthCheck from "./routes/healthCheck.js";

const app = express();
const port = process.env.PORT || 3000;

// Serve Swagger docs at /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use vectorEndpoints router
app.use("/api/vector", vectorEndpoints);

// Use healthCheck router
app.use("/api/vector", healthCheck);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
