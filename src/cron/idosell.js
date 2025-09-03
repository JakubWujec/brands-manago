import cron from 'node-cron';

// Pobierz wszystkie zamówienia z podanego sklepu. Następnie pobieraj  
// nowo dodane zamówienia co X minut (np. parametr  
// ordersRange.ordersDateRange w dokumentacji) oraz aktualizuj zamówienia  
// które posiadasz już w bazie danych do póki zamówienie nie otrzyma  
// statusu "finished", "lost", "false". Dane trzymaj w bazie danych  
// mongoDB.  


const TEN_SECONDS_INTERVAL = '*/10 * * * * *'
const MINUTE_INTERVAL = '* * * * *'
const HOUR_INTERVAL = '0 * * * *'

cron.schedule(TEN_SECONDS_INTERVAL, () => {
    console.log('Running cron job to insert data...');
    // pobierz wszystkie zamowienia ze sklepu
    // aktualizuj zamowienia ktore nie maja jakiegos tam statusu od jakiejs daty
    // pobierz nowo dodane zamowienia 
});

