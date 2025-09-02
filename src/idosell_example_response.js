import { response_example } from "./example_response.js";

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
    let products = []
    for (let productResult in productResults) {
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

console.log(processResponse(response_example));
