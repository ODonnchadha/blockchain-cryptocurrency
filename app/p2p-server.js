const Websocket = require('ws');
const P2P_PORT = process.env.P2P_PORT || 5001;
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];

/*
Open a websocket server. Wait for connections.
*/
class P2PServer {
    constructor(blockchain) {
      this.blockchain = blockchain;
      this.sockets = [];
    }
  
    listen() {
      const server = new Websocket.Server({ port: P2P_PORT });
      server.on('connection', socket => this.connectSocket(socket));
      console.log(`Listening for peer-to-peer connections on: ${P2P_PORT}`);
      this.connectToPeers();
    }
  
    connectToPeers() {
        peers.forEach(peer => {
            const socket = new Websocket(peer);
            socket.on('open', () => this.connectSocket(socket));
        });
    }

    connectSocket(socket) {
      this.sockets.push(socket);
      console.log('Socket connected ', socket);
      this.messageHandler(socket);
      this.sendChain(socket);
    }

    /*
    Use the received chain to synchronize chains across all instances with the `replace` function.
    */
    sendChain(socket) {
        socket.send(JSON.stringify(this.blockchain.chain));
    }

    syncChains() {
        this.sockets.forEach(socket => {
          this.sockets.forEach(socket => this.sendChain(socket));
        });
    }
    /*
    Allow the sockets to send messages to each other.
    */
    messageHandler(socket) {
        socket.on('message', message => {
            const data = JSON.parse(message);
            console.log('data ', data);
            this.blockchain.replace(data);
      });
    }
}
  
  module.exports = P2PServer;