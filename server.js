// server.js
// -------------------------
// Un semplice server TCP per Node.js che accetta connessioni in arrivo,
// stampa i messaggi ricevuti dai client e gestisce la disconnessione.
//
// Si arresta in modo pulito alla pressione di CTRL+C (SIGINT).
//
// Autore: Marco Pratesi
// -------------------------

const net = require('node:net');

// Creazione del server TCP
const server = net.createServer((socket) => {
    console.log('📡 Client connesso');

    // Evento: quando riceviamo dati dal client
    socket.on('data', (data) => {
        console.log('📥 Messaggio ricevuto:', data.toString());
    });

    // Evento: quando il client chiude la connessione
    socket.on('end', () => {
        console.log('📴 Client disconnesso');
    });

    // Evento: gestione errori (opzionale ma consigliata)
    socket.on('error', (err) => {
        console.error('❌ Errore nella connessione del client:', err.message);
    });
});

// Il server si mette in ascolto sulla porta 2020
server.listen(2020, 'localhost', () => {
    console.log('🚀 Server in ascolto su localhost:2020');
});

// Gestione della chiusura con CTRL+C
process.on('SIGINT', () => {
    console.log('\n🛑 Interruzione ricevuta (CTRL+C), chiusura server...');
    server.close(() => {
        console.log('✅ Server chiuso correttamente');
        process.exit(0); // Uscita pulita
    });
});
