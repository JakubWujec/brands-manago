
import express from "express";
import OrderModel from "../schema/order.schema.js";

const router = express.Router();

router.get("/", async (req, res) => {
    let orders = await OrderModel.find();
    
    res.json(orders);
});

router.get('/:id', async (req, res) => {
    let orderId = req.params.id
    let order = await OrderModel.findOne({ orderId: orderId });
    console.log("XXX", order, orderId)

    if (!order){
        res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
})

export default router;
