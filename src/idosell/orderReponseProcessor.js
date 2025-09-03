import { connectToDatabase } from "../database.js";
import mongoose from 'mongoose';
import OrderModel from "../schema/order.schema.js";

function processResponse(responseData) {
    let orders = []
    for (let result_data of responseData['Results']) {
        let orderData = processResult(result_data);
        orders.push(orderData)
    }
    return orders;
}

function processResult(resultData) {
    let productResults = resultData['orderDetails']['productsResults']
    let orderId = resultData['orderId']
    let orderStatus = resultData['orderDetails']['orderStatus']
    let products = []
    for (let productResult of productResults) {
        let productQuantity = productResult['productQuantity']
        let productId = productResult['productId']
        products.push({
            productId,
            productQuantity
        })
    }

    let orderCost = processOrderCurrencyData(resultData['orderDetails']['payments']['orderBaseCurrency'])

    return {
        orderId,
        products,
        orderStatus,
        ...orderCost,
    }
}


function processOrderCurrencyData(orderCurrencyData) {
    const fields = ['orderProductsCost', 'orderDeliveryCost', 'orderPayformCost', 'orderInsuranceCost']
    const currency = orderCurrencyData['billingCurrency']
    let totalPrice = 0
    for (let field of fields) {
        totalPrice += orderCurrencyData[field]
    }

    return {
        totalPrice,
        currency
    }
}

// Function to add a new order
async function addNewOrder(orderData) {
    try {
        const newOrder = new OrderModel({
            order_id: orderData.order_id,
            products: orderData.products.map(product => ({
                product_id: product.product_id,
                quantity: product.quantity,
            })),
            total_price: orderData.total_price,
        });

        const savedOrder = await newOrder.save();
        console.log('Order saved successfully:', savedOrder);
        return savedOrder;
    } catch (error) {
        console.error('Error saving order:', error);
        throw error; // Rethrow the error for further handling if needed
    }
}

async function main() {
    await connectToDatabase(); // Connect to the database
   
    const orderData = {
        order_id: 12345,
        products: [
            { product_id: 'abc123', quantity: 2 },
            { product_id: 'xyz456', quantity: 1 },
        ],
        total_price: 99.99,
    };

    try {
        const order = await addNewOrder(orderData)
        console.log('New order added:', order);
    } catch (err) {
        console.error('Failed to add order:', err);
    } finally {
        mongoose.connection.close(); // Close the connection when done
    }
}

export {
    processResult,
    processResponse,
    processOrderCurrencyData
}