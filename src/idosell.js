const PANEL_LINK = 'zooart6.yourtechnicaldomain.com'
const IDOSELL_API_KEY = "YXBwbGljYXRpb24xNjpYeHI1K0MrNVRaOXBaY2lEcnpiQzBETUZROUxrRzFFYXZuMkx2L0RHRXZRdXNkcmF5R0Y3ZnhDMW1nejlmVmZP"

async function fetchAllIdosellOrdersSince(ordersDateBegin) {
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
                    ordersDateRange: { ordersDateType: 'add', ordersDateBegin: '2025-01-09 00:00:00' }
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


