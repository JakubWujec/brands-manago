const PANEL_LINK = 'zooart6.yourtechnicaldomain.com'
const IDOSELL_API_KEY = "YXBwbGljYXRpb24xNjpYeHI1K0MrNVRaOXBaY2lEcnpiQzBETUZROUxrRzFFYXZuMkx2L0RHRXZRdXNkcmF5R0Y3ZnhDMW1nejlmVmZP"
const ORDER_STATUSES = {
    finished_ext: "completed in FA application",
    finished: "completed",
    new: "not handled",
    payment_waiting: "awaiting payment",
    delivery_waiting: "awaiting delivery",
    on_order: "in progress",
    packed: "being picked",
    packed_fulfillment: "being picked - fulfilment",
    packed_ready: "packed",
    ready: "ready",
    wait_for_dispatch: "awaiting dispatch date",
    suspended: "on hold",
    joined: "merged",
    missing: "missing",
    lost: "lost",
    false: "false",
    canceled: "Customer canceled"
};
const STATUSES_TO_EXCLUDE = [
    "finished", "lost", "false"
]

class IdosellApiService {
    constructor() {

    }

    async fetchAllIdosellOrdersSince(ordersDateBegin = '2025-01-09 00:00:00') {
        const URL = `https://${PANEL_LINK}/api/admin/v6/orders/orders/search`
        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'X-API-KEY': IDOSELL_API_KEY
            },
            body: JSON.stringify({
                params: {
                    ordersRange: {
                        resultsPage: 1,
                        ordersDateRange: { ordersDateType: 'add', ordersDateBegin: ordersDateBegin }
                    }
                }
            })
        };

        fetch(URL, options)
            .then(res => {
                data = res.json();
            })
            .then(res => console.log(res))
            .catch(err => console.error(err));
    }
}



export {
    IdosellApiService,
    ORDER_STATUSES
}