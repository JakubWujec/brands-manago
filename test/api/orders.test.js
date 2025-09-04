import request from 'supertest';
import { afterAll, beforeEach, beforeAll, describe, expect, it, vi } from "vitest";
import orders from "../../src/api/orders.js"
import express from "express";
import OrderModel from '../../src/schema/order.schema.js';
import { connectToDatabase, disconnectFromDatabase } from '../../src/database.js';

const app = express();
app.use(express.json());

app.use("/api/v1/orders", orders);

describe('Order API', async () => {
    beforeAll(async () => {
        try {
            await connectToDatabase();
            await OrderModel.deleteMany({});
            await OrderModel.insertOne({
                orderId: 1,
                products: [],
                totalPrice: 23,
                orderStatus: 'new'
            })
        } catch (error) {
            console.log(error)
        }

    });
    afterAll(async () => {
        await disconnectFromDatabase()
    })


    it('should return all orders in JSON format', async () => {
        const response = await request(app).get('/api/v1/orders');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                orderId: expect.any(String),
                products: expect.any(Array),
                totalPrice: expect.any(Number),
            }),
        ]));
    });

    it('should return a specific order by ID', async () => {
        const response = await request(app).get('/api/v1/orders/1');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.objectContaining({
            orderId: "1",
            products: expect.any(Object),
            totalPrice: expect.any(Number),
        }));
    });

    it('should return 404 for a non-existent order', async () => {
        const response = await request(app).get('/api/v1/orders/999');
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ message: 'Order not found' });
    });
});
