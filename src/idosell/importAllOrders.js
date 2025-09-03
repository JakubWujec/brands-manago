import { connectToDatabase, createConnection } from "../database.js";
import OrderModel from "../schema/order.schema.js";
import { IdosellApiService } from "./apiService.js";
import { processResponse } from "./orderReponseProcessor.js";


async function importAllOrders() {
    let connection = null;
    try {
        connection = await createConnection();

        let service = new IdosellApiService();
        let response = await service.fetchAllIdosellOrdersSince();
        let orders = processResponse(response);
        let orderModels = orders.map(order => new OrderModel({
            order_id: order.orderId,
            products: order.products.map(product => ({
                product_id: product.productId,
                quantity: product.productQuantity,
            })),
            total_price: order.totalPrice,
            status: order.orderStatus
        }));

        const Order = connection.model('Order', OrderModel.schema);
        await Order.insertMany(orderModels);

    } catch (error) {
        console.log(error);
    } finally {
        if (connection){
            await connection.close();
            console.log('MongoDB connection closed.');
        }
    }


}


importAllOrders();