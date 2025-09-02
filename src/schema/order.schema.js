import mongoose, { mongo } from 'mongoose';

const orderSchema = new mongoose.Schema({
    order_id: Number,
    product: {
        product_id: String,
        quantity: Number,
    },
    total_price: Number,
});

const OrderModel =  mongoose.models.Order || mongoose.model('Order', orderSchema);

export default OrderModel;