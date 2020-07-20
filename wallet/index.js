const { WALLET_INITIAL_BALANCE } = require('../config');
const ChainUtil = require('../chain-util');
const Transaction = require('./transaction');

/*
The keyPair object will contain methods that can return the private key for 
the wallet, as well as its public key.

The public key also serves as the public address for the wallet, and is what 
other individuals in the network use to send currency to the wallet.
*/
class Wallet {
  constructor() {
    this.balance = WALLET_INITIAL_BALANCE;
    this.keyPair = ChainUtil.genKeyPair();
    this.publicKey = this.keyPair.getPublic().encode('hex');
  }

  /*
  This function will assume an 'existingTransaction' function exists for the transactionPool 
  and will help replace existing transactions in the pool.
  */
  createTransaction(recipient, amount, pool) {
    if (amount > this.balance) {
      console.log(`Amount: ${amount}, exceeds current balance: ${this.balance}`);
      return;
    }
  
    let transaction = pool.existingTransaction(this.publicKey);
    if (transaction) {
      transaction.update(this, recipient, amount);
    } else {
      transaction = Transaction.create(this, recipient, amount);
      pool.addOrUpdate(transaction);
    }
  
    return transaction;
  }

  sign (hash) {
    return this.keyPair.sign(hash);
  }

  toString() {
    return `Wallet -
    publicKey : ${this.publicKey.toString()}
    balance   : ${this.balance}`
  }
}

module.exports = Wallet;