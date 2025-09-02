import request from 'supertest';
import { describe, it, expect } from "vitest";
import app from "../../src/app.js";

describe('Order API', () => {
    it('should return all orders in JSON format', async () => {
        const response = await request(app).get('/api/v1/orders');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                order_id: expect.any(Number),
                product: expect.any(Object),
                total_price: expect.any(Number),
            }),
        ]));
    });

    it('should return a specific order by ID', async () => {
        const response = await request(app).get('/api/v1/orders/1');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.objectContaining({
            order_id: 1,
            product: expect.any(Object),
            total_price: expect.any(Number),
        }));
    });

    it('should return 404 for a non-existent order', async () => {
        const response = await request(app).get('/api/v1/orders/999');
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ message: 'Order not found' });
    });
});
