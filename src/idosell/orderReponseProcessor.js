import mongoose from 'mongoose';
import { connectToDatabase } from "../database.js";
import OrderModel from "../schema/order.schema.js";

function processResponse(responseData) {
    return responseData['Results'].map(resultData => processResult(resultData));
}

function processResult(resultData) {
    let productResults = resultData['orderDetails']['productsResults']
    let orderId = resultData['orderId']
    let orderStatus = resultData['orderDetails']['orderStatus']
    let products = productResults.map(productResult => {
        return {
            productId: productResult['productId'],
            productQuantity: productResult['productQuantity']
        }        
    })

    let orderCost = processOrderCurrencyData(resultData['orderDetails']['payments']['orderBaseCurrency'])

    return new OrderModel({
        orderId: orderId,
        products: products.map(product => ({
            productId: product.productId,
            productQuantity: product.productQuantity,
        })),
        totalPrice: orderCost.totalPrice,
        orderStatus: orderStatus
    })

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

export {
    processOrderCurrencyData, processResponse, processResult
};
