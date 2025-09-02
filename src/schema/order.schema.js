import mongoose from 'mongoose';

const orderProductSchema = new mongoose.Schema({
    product_id: String,
    quantity: Number,
});

const orderSchema = new mongoose.Schegma({
    order_id: Number,
    products: [orderProductSchema],
    total_price: Number,
});

const OrderModel = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default OrderModel;