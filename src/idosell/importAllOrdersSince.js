import { createConnection } from "../database.js";
import OrderModel from "../schema/order.schema.js";
import { fetchAllIdosellOrdersSince } from "./apiService.js";
import { processResponse } from "./orderReponseProcessor.js";
import {MongoBulkWriteError} from 'mongodb'

const LIMIT = 100;

async function importAllOrdersSince(ordersDateBegin = "1901-01-01 00:00:00") {
  let connection = null;
  try {
    connection = await createConnection();
    let resultsPage = 0;

    do {
      const response = await fetchAllIdosellOrdersSince(ordersDateBegin, resultsPage);
      let orderModels = processResponse(response);
      if (orderModels.length == 0) {
        break;
      }

      try {
        const Order = connection.model("Order", OrderModel.schema);
        await Order.insertMany(orderModels, { ordered: false });
      } catch (err) {
        // Ignore the duplicate key error but throw other errors
        if (!(err instanceof MongoBulkWriteError && err.code === 11000)) { 
          throw err;
        }
      };

      resultsPage += 1;
      console.log("IMPORTING PAGE: ", resultsPage)
    } while (resultsPage < LIMIT)

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