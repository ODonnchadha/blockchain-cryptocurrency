const express = require('express');
const P2PServer = require('./p2p-server');
const bodyParser = require('body-parser');
const Blockchain = require('../blockchain');
const Wallet = require('../wallet');
const TransactionPool = require('../wallet/transaction-pool');

const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();
const blockchain = new Blockchain();
const wallet = new Wallet();
const pool = new TransactionPool();

app.use(bodyParser.json());
app.listen(HTTP_PORT, () => console.log(`Listening on port: ${HTTP_PORT}`));

const peer = new P2PServer(blockchain, pool);
peer.listen();

app.get('/blocks', (req, res) => {
	res.json(blockchain.chain);
});
/*
By giving each of users their own wallet, users of the application will have the ability to 
conduct transactions with each other, thus putting the cryptocurrency into action.
*/
app.get('/transactions', (req, res) => {
  res.json(pool.transactions);
});

app.post('/mine', (req, res) => {
	const block = blockchain.add(req.body.data);
	console.log(`New block added: ${block.toString()}`);
	peer.syncChains();
	res.redirect('/blocks');
});

app.post('/transact', (req, res) => {
	const { recipient, amount } = req.body;
  const transaction = wallet.createTransaction(recipient, amount, pool);
  res.redirect('/transactions');
});