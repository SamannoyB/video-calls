const express = require('express');
const app = express();
const server = require('http').createServer(app);
const { ExpressPeerServer } = require('peer');

const peerServer = ExpressPeerServer(server, {
          debug: true
});

app.use('/peer', peerServer);
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

server.listen(8080, () => console.log("Server listening on port 8080!"));