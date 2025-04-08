import dotenv from "dotenv";

dotenv.config();

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { swaggerSpec, swaggerUi } from "../config/swagger.js";
import routes from "./routes/index.js";
import { consumeCMSEvents } from "../clients/rabbitmq.js";
import { processVectorization, deleteEmbeddingsForDocument } from "./routes/vector/utils/index.js";

consumeCMSEvents(async (event) => {
  if (event.type === "CMS_DOC_CREATED") {
    await processVectorization(event.content, event.documentId);
  } else if (event.type === "CMS_DOC_DELETED") {
    await deleteEmbeddingsForDocument(event.documentId);
  }
});

const app = express();
const port = process.env.PORT || 3000;

// Serve Swagger docs at /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use centralized routes
app.use("/api", routes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
