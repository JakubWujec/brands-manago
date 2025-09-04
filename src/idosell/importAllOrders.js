import { createConnection } from "../database.js";
import OrderModel from "../schema/order.schema.js";
import { fetchAllIdosellOrdersSince} from "./apiService.js";
import { processResponse } from "./orderReponseProcessor.js";

async function importAllOrders() {
  let connection = null;
  try {
    connection = await createConnection();


    const response = await fetchAllIdosellOrdersSince();
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

