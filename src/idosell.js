const domain = "abc"
const URL = `https://${domain}/api/admin/v6/orders/orders`
const PANEL_LINK = 'zooart6.yourtechnicaldomain.com'
const IDOSELL_API_KEY = "YXBwbGljYXRpb24xNjpYeHI1K0MrNVRaOXBaY2lEcnpiQzBETUZROUxrRzFFYXZuMkx2L0RHRXZRdXNkcmF5R0Y3ZnhDMW1nejlmVmZP"

function abc() {
    const options = {method: 'GET', headers: {accept: 'application/json'}};

    fetch('https://clientxxx.idosell.com/api/admin/v6/orders/orders', options)
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.error(err));
}