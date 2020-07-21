const Websocket = require('ws');
const P2P_PORT = process.env.P2P_PORT || 5001;
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];

/*
The messages should be sent with different types so that the message handler can respond accordingly.
*/
const MESSAGE_TYPES = {
  chain: 'CHAIN',
  transaction: 'TRANSACTION'
 };

/*
Open a websocket server. Wait for connections.
*/
class P2PServer {
  constructor(blockchain, pool) {
    this.blockchain = blockchain;
    this.pool = pool;
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
    socket.send(JSON.stringify({ type: MESSAGE_TYPES.chain, chain: this.blockchain.chain }));
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

      switch(data.type) {
        case MESSAGE_TYPES.chain:
          this.blockchain.replace(data.chain);
          break;
        case MESSAGE_TYPES.transaction:
          this.transactionPool.addOrUpdate(data.transaction);
          break;
      }
    });
  }

  sendTransaction(socket, transaction) {
    socket.send(JSON.stringify({ type: MESSAGE_TYPES.transaction, transaction }));
  }
      
  broadcastTransaction(transaction) {
    this.sockets.forEach(socket => this.sendTransaction(socket, transaction));
  }
}
  
  module.exports = P2PServer;