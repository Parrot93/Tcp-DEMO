// client.js
// -------------------------
// Un semplice client TCP per Node.js che si connette a un server locale,
// invia un messaggio e poi chiude la connessione.
//
// Assicurati che il server TCP sia in ascolto sulla stessa porta e host.
//
// Autore: Marco Pratesi
// -------------------------

const net = require('node:net');

// Messaggio da inviare al server
const message = {
    data: 'ciao server'
};

// Configurazione della connessione
const options = {
    host: 'localhost',
    port: 2020
};

// Creazione della connessione TCP al server
const client = net.createConnection(options);

// Evento: connessione avvenuta con successo
client.on('connect', () => {
    console.log('✅ Connesso al server!');
    console.log('📤 Sto inviando il messaggio: ' + message.data);

    // Invio del messaggio al server
    const success = client.write(message.data, () => {
        console.log('✅ Messaggio inviato con successo!');
        
        // Chiudiamo la connessione dopo l'invio
        client.end();
    });

    // Se il buffer è pieno, il messaggio sarà inviato appena possibile
    if (!success) {
        console.warn('⚠️ Il messaggio non è stato inviato immediatamente (buffer pieno)');
    }
});

// Evento: risposta dal server (opzionale, utile se il server risponde)
// client.on('data', (data) => {
//     console.log('📥 Risposta dal server:', data.toString());
//     client.end(); // Chiudi dopo aver ricevuto la risposta
// });

// Evento: quando il client chiude la connessione
client.on('end', () => {
    console.log('📴 Disconnessione dal server.');
});

// Evento: gestione degli errori
client.on('error', (err) => {
    console.error('❌ Errore:', err.message);
});
