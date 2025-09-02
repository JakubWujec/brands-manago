class OrderService {
    constructor() {
        this.orders = [
            { order_id: 1, product: { product_id: 'P001', quantity: 2 }, total_price: 2400 },
            { order_id: 2, product: { product_id: 'P002', quantity: 1 }, total_price: 800 },
            { order_id: 3, product: { product_id: 'P003', quantity: 3 }, total_price: 1800 },
        ];
    }

    all() {
        return this.orders;
    }

    byId(id){
        return this.orders.find(order => order.order_id == id);
    }

}

let orderService = new OrderService();

export default orderService