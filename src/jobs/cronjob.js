import cron from "node-cron";
import updateUnfinishedOrders from "../idosell/updateUnfinishedOrders.js";
import importAllOrdersSince from "../idosell/importAllOrdersSince.js";

// Pobierz wszystkie zamówienia z podanego sklepu. Następnie pobieraj
// nowo dodane zamówienia co X minut (np. parametr
// ordersRange.ordersDateRange w dokumentacji) oraz aktualizuj zamówienia
// które posiadasz już w bazie danych do póki zamówienie nie otrzyma
// statusu "finished", "lost", "false". Dane trzymaj w bazie danych
// mongoDB.

const TEN_SECONDS_INTERVAL = "*/10 * * * * *";
const MINUTE_INTERVAL = "* * * * *";
const HOUR_INTERVAL = "0 * * * *";

let lastImportTime = null

const runCronJob = () => {
    console.log("Running cron job to insert data...");
    const currentTime = getCurrentTimeFormatted();

    // Update unfinished orders
    updateUnfinishedOrders();

    // Import new orders based on the last import time
    if (lastImportTime === null) {
        importAllOrdersSince();
    } else {
        importAllOrdersSince(lastImportTime);
    }

    lastImportTime = currentTime;
};

cron.schedule(TEN_SECONDS_INTERVAL, runCronJob);

const getCurrentTimeFormatted = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

