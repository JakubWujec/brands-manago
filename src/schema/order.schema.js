import mongoose from "mongoose";
import { ORDER_STATUSES } from "../idosell/apiService.js";

const orderProductSchema = new mongoose.Schema({
  productId: Number,
  productQuantity: Number,
});

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    unique: true, // Ensures orderId is unique
    required: true,
  },
  products: [orderProductSchema],
  totalPrice: Number,
  orderStatus: {
    type: String,
    enum: Object.keys(ORDER_STATUSES),
    default: "new",
  },
});

const OrderModel = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default OrderModel;
