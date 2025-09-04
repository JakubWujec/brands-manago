import express from "express";
import orders from "./orders.js";
import auth from "./auth.js";
import verifyToken from "../verifyToken.js"

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.use("/orders", orders)
router.use('/auth', auth)

export default router;
