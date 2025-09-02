import OrderModel from "../schema/order.schema.js";

class InMemoryOrderService {
    constructor() {
        this.orders = [
            { order_id: 1, product: { product_id: 'P001', quantity: 2 }, total_price: 2400 },
            { order_id: 2, product: { product_id: 'P002', quantity: 1 }, total_price: 800 },
            { order_id: 3, product: { product_id: 'P003', quantity: 3 }, total_price: 1800 },
        ];
    }

    all() {
        return this.orders;
    }

    byId(id) {
        return this.orders.find(order => order.order_id == id);
    }

}

class MongoOrderService {
    constructor() {

    }

    async all() {
        return await OrderModel.find();
    }

    async byId(id) {
        return await OrderModel.findOne({ order_id: id });
    }

    async unfinishedIds(statuses) {
        return await OrderModel.find({
            status: { $in: statuses },
        }).select('order_id')
    }
}

const OrderServiceFactory = () => {
    const env = process.env.NODE_ENV || 'development';

    switch (env) {
        case 'production':
        case 'development':
            return new MongoOrderService();
        case 'test':
            return new InMemoryOrderService();
        default:
            throw new Error('Unknown environment: ' + env);
    }
};

let orderService = OrderServiceFactory();

export default orderService