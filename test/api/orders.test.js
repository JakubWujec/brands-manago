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

    it('should return all orders in CSV format', async () => {
        const response = await request(app).get('/api/v1/orders?');

        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/text\/csv/);
        expect(response.headers['content-disposition']).toContain('attachment; filename=orders.csv');
        expect(response.text).toContain('orderId'); // Check if CSV contains header
    });

    it('should return a specific order by ID', async () => {
        const orderId = '1'; // Use a valid orderId from your test data
        const response = await request(app).get(`/api/v1/orders/${orderId}`);
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/text\/csv/);
        expect(response.headers['content-disposition']).toContain('attachment; filename=orders.csv');
        expect(response.text).toContain('orderId'); // Check if CSV contains header
    });

    it('should return 404 for a non-existent order', async () => {
        const response = await request(app).get('/api/v1/orders/nonexistentId');
        expect(response.status).toBe(404);

        expect(response.body.message).toBe('Order not found');
    });
});
