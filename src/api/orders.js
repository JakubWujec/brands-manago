import express from "express";
import OrderModel from "../schema/order.schema.js";
import { stringify } from "csv-stringify";

const router = express.Router();

router.get("/", async (req, res) => {
    let { minWorth, maxWorth } = req.query;
    let filters = {};

    minWorth = Number(minWorth);
    maxWorth = Number(maxWorth);

    if (!isNaN(minWorth)) { 
        filters.totalPrice = { ...filters.totalPrice, $gte: minWorth };
    }
    
    if (!isNaN(maxWorth)) { 
        filters.totalPrice = { ...filters.totalPrice, $lte: maxWorth };
    }

    try {
        const orders = await OrderModel.find(filters);
        sendCsvResponse(res, orders);
    } catch (error) {
        console.log("Error fetching orders:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get('/:id', async (req, res) => {
    let orderId = req.params.id;

    try {
        const order = await OrderModel.findOne({ orderId: orderId });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        sendCsvResponse(res, [order]); 
    } catch (error) {
        console.log("Error fetching order:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

const sendCsvResponse = (res, orders) => {
    const csvData = orders.map(order => {
        return {
            orderId: order.orderId,
            totalPrice: order.totalPrice,
            orderStatus: order.orderStatus,
            products: order.products
        };
    });

    stringify(csvData, { header: true }, (err, output) => {
        if (err) {
            console.error("Error converting to CSV:", err);
            return res.status(500).send("Internal Server Error");
        }

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=orders.csv');
        res.send(output);
    });
};


export default router;
