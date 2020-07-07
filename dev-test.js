const Block = require('./blockchain/block');

const block1 = Block.genesis();
console.log(block1.toString());

const data = 'foobar';
const block2 = Block.mine(block1, data);
console.log(block2.toString());

const Wallet = require('./wallet');
const wallet = new Wallet();
console.log(wallet.toString());

const Transaction = require('./wallet/transaction');
const transaction = Transaction.instance(wallet, 'X', 50);

console.log('transaction ', transaction.outputs);