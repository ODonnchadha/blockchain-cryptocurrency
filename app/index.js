const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('../blockchain');
const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();
const blockchain = new Blockchain();

app.use(bodyParser.json());

app.listen(HTTP_PORT, () => console.log(`Listening on port: ${HTTP_PORT}`));

app.get('/blocks', (req, res) => {
	res.json(blockchain.chain);
});

app.post('/mine', (req, res) => {
	const block = blockchain.add(req.body.data);
	console.log(`New block added: ${block.toString()}`);
	res.redirect('/blocks');
  });