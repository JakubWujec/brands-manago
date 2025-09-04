import { withConnection } from "../database.js";
import OrderModel from "../schema/order.schema.js";
import { IdosellApiService } from "./apiService.js";
import { processResponse } from "./orderReponseProcessor.js";

async function updateUnfinishedOrders() {
  // pobierz id zamowien z db git statusami
  const ordersIds = await getOrderModelsIds();
  // pobierz zamowienia z idosella
  const service = new IdosellApiService();
  const idosellResponse = await service.fetchOrderByIds(ordersIds);

  // przeprocesuj
  console.log(idosellResponse);
  const orderModelsToUpdate = processResponse(idosellResponse);
  // update

  await updateOrders(orderModelsToUpdate);
}

async function getOrderModelsIds() {
  await withConnection(async (connection) => {
    const ordersIds = await connection.model("Order", OrderModel.schema).find({
      orderStatus: { $in: ["finished", "lost", "false"] },
    }).select("orderId");
    return ordersIds;
  });
}

async function updateOrders(orderModelsToUpdate) {
  await withConnection(async (connection) => {
    const operations = orderModelsToUpdate.map(order => ({
      updateOne: {
        filter: { orderId: order.orderId }, // Filter by orderId
        update: {
          $set: {
            products: order.products,
            totalPrice: order.totalPrice,
            orderStatus: order.orderStatus,
          },
        },
      },
    }));

    try {
      const result = await connection.model("Order", OrderModel.schema).bulkWrite(operations);
      console.log("Bulk upsert result:", result);
    }
    catch (error) {
      console.error("Error during bulk upsert:", error);
    }
  });
}

updateUnfinishedOrders();
