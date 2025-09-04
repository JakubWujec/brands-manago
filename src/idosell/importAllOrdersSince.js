import { createConnection } from "../database.js";
import OrderModel from "../schema/order.schema.js";
import { fetchAllIdosellOrdersSince} from "./apiService.js";
import { processResponse } from "./orderReponseProcessor.js";

async function importAllOrdersSince(ordersDateBegin = "1901-01-01 00:00:00") {
  let connection = null;
  try {
    connection = await createConnection();
    const response = await fetchAllIdosellOrdersSince(ordersDateBegin);
    const orderModels = processResponse(response);
    const Order = connection.model("Order", OrderModel.schema);
    // skip duplicates
    await Order.insertMany(orderModels, { ordered: false });
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

export default importAllOrdersSince