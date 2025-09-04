import { createConnection } from "../database.js";
import OrderModel from "../schema/order.schema.js";
import { IdosellApiService } from "./apiService.js";
import { processResponse } from "./orderReponseProcessor.js";

async function importAllOrders() {
  let connection = null;
  try {
    connection = await createConnection();

    const service = new IdosellApiService();
    const response = await service.fetchAllIdosellOrdersSince();
    const orderModels = processResponse(response);

    const Order = connection.model("Order", OrderModel.schema);
    await Order.insertMany(orderModels);
  }
  catch (error) {
    console.log(error);
  }
  finally {
    if (connection) {
      await connection.close();
      console.log("MongoDB connection closed.");
    }
  }
}
