
import express from "express";
import OrderModel from "../schema/order.schema.js";

const router = express.Router();

router.get("/", async (req, res) => {
    let { minWorth, maxWorth } = req.query;
    let filter = {};

    minWorth = Number(minWorth);
    maxWorth = Number(maxWorth);

    if (!isNaN(minWorth)) { 
        filter.totalPrice = { ...filter.totalPrice, $gte: minWorth };
    }
    
    if (!isNaN(maxWorth)) { 
        filter.totalPrice = { ...filter.totalPrice, $lte: maxWorth };
    }

    try {
        const orders = await OrderModel.find(filter);
        console.log(orders);
        res.json(orders);
    } catch (error) {
        console.log("Error fetching orders:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get('/:id', async (req, res) => {
    let orderId = req.params.id
    let order = await OrderModel.findOne({ orderId: orderId });
    console.log("XXX", order, orderId)

    if (!order) {
        res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
})

export default router;
