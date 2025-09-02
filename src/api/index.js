import express from "express";


import orders from "./orders.js"

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.use("/orders", orders)

export default router;
