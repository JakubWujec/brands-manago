import OrderModel from "../schema/order.schema.js";

function processResponse(responseData) {
  if (!("Results" in responseData)) {
    return [];
  }
  return responseData.Results.map(resultData => processResult(resultData));
}

function processResult(resultData) {
  const productResults = resultData.orderDetails.productsResults;
  const orderId = resultData.orderId;
  const orderStatus = resultData.orderDetails.orderStatus;
  const products = productResults.map((productResult) => {
    return {
      productId: productResult.productId,
      productQuantity: productResult.productQuantity,
    };
  });

  const orderCost = processOrderCurrencyData(resultData.orderDetails.payments.orderBaseCurrency);

  return new OrderModel({
    orderId,
    products: products.map(product => ({
      productId: product.productId,
      productQuantity: product.productQuantity,
    })),
    totalPrice: orderCost.totalPrice,
    orderStatus,
  });
}

function processOrderCurrencyData(orderCurrencyData) {
  const fields = ["orderProductsCost", "orderDeliveryCost", "orderPayformCost", "orderInsuranceCost"];
  const currency = orderCurrencyData.billingCurrency;
  let totalPrice = 0;
  for (const field of fields) {
    totalPrice += orderCurrencyData[field];
  }

  return {
    totalPrice,
    currency,
  };
}

export {
  processOrderCurrencyData,
  processResponse,
  processResult,
};
