import mongoose from 'mongoose';
import { ORDER_STATUSES } from '../idosellApiService.js';

const orderProductSchema = new mongoose.Schema({
    product_id: String,
    quantity: Number,
});

const orderSchema = new mongoose.Schema({
    order_id: Number,
    products: [orderProductSchema],
    total_price: Number,
    status: {
        type: String,
        enum: Object.keys(ORDER_STATUSES), 
        default: 'new',
    },
});

const OrderModel = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default OrderModel;