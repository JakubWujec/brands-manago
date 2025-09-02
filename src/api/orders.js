
import express from "express";
import orderService from "../services/orderService.js";


const router = express.Router();

router.get("/", async (req, res) => {
    let orders = await orderService.all();
    
    res.json(orders);
});

router.get('/:id', async (req, res) => {
    let orderId = parseInt(req.params.id, 10);
    let order = await orderService.byId(orderId);

    if (!order){
        res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
})

export default router;
