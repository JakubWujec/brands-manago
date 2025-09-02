import express from "express";

import emojis from "./emojis.js";
import orders from "./orders.js"

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.use("/emojis", emojis);
router.use("/orders", orders)

export default router;
