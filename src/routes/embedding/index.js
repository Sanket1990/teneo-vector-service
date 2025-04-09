import express from "express";

import generateEmbeddings from "./generateEmbeddings.js";
import getEmbeddings from "./getEmbeddings.js";
import deleteEmbeddings from "./deleteEmbeddings.js";

const router = express.Router();

router.use("/", generateEmbeddings);
router.use("/list", getEmbeddings);
router.use("/delete", deleteEmbeddings);

export default router;
