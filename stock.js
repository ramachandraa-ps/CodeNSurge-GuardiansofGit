const socket = new WebSocket('wss://ws.finnhub.io?token=crp3m4pr01qo7n2j3amgcrp3m4pr01qo7n2j3an0');

// Connection opened -> Subscribe
socket.addEventListener('open', function (event) {
    socket.send(JSON.stringify({'type':'subscribe-news', 'symbol': 'AAPL'}))
    socket.send(JSON.stringify({'type':'subscribe-news', 'symbol': 'MSFT'}))
    socket.send(JSON.stringify({'type':'subscribe-news', 'symbol': 'AMZN'}))
});

// Listen for messages
socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
});

// Unsubscribe
 var unsubscribe = function(symbol) {
    socket.send(JSON.stringify({'type':'unsubscribe-news','symbol': symbol}))
}