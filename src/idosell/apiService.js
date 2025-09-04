import { env } from "../env";

const PANEL_LINK = env.IDOSELL_PANEL_LINK;
const IDOSELL_API_KEY = env.IDOSELL_API_KEY;
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
  canceled: "Customer canceled",
};

class IdosellApiService {
  constructor() {

  }

  async fetchAllIdosellOrdersSince(ordersDateBegin = "1901-01-01 00:00:00") {
    const URL = `https://${PANEL_LINK}/api/admin/v6/orders/orders/search`;
    const options = {
      method: "POST",
      headers: {
        "accept": "application/json",
        "content-type": "application/json",
        "X-API-KEY": IDOSELL_API_KEY,
      },
      body: JSON.stringify({
        params: {
          ordersRange: {
            resultsPage: 1,
            ordersDateRange: { ordersDateType: "add", ordersDateBegin },
          },
        },
      }),
    };

    return fetch(URL, options)
      .then(res => res.json())
      .catch(err => console.error(err));
  }

  async fetchOrderByIds(ordersIds) {
    const options = {
      method: "GET",
      headers: {
        "accept": "application/json",
        "X-API-KEY": IDOSELL_API_KEY,
      },
    };

    return fetch(`https://${PANEL_LINK}/api/admin/v6/orders/orders?${new URLSearchParams({
      ordersIds,
    })}`, options)
      .then(res => res.json())
      .catch(err => console.error(err));
  }
}

function main() {
  const service = new IdosellApiService();
  // service.fetchAllIdosellOrdersSince();
  service.fetchOrderByIds(["admin-3", "admin-4"]);
}

// main()

export {
  IdosellApiService,
  ORDER_STATUSES,
};
