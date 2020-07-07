const ChainUtil = require('../chain-util');

/*
Transactions objects represent exchanges in the cryptocurrency.
They will consist of three primary components:
  1.) an input field which provides information about the sender of the transaction. 
  2.) output fields which detail how much currency the sender is giving to other wallets, and 
  3.) a unique `id` to identify the transaction object.
To generate an id for transactions, use a module called uuid which stands for universally unique identifier
*/
class Transaction {
  constructor() {
    this.id = ChainUtil.id();
    this.input = null;
    this.outputs = [];
  }

  static instance(senderWallet, recipient, amount) {
    if (amount > senderWallet.balance) {
      console.log(`Amount: ${amount} exceeds balance.`);
      return;
    }

    const transaction = new this();

    transaction.outputs.push(...[
      { amount: senderWallet.balance - amount, address: senderWallet.publicKey },
      { amount, address: recipient }
    ]);

    return transaction;
  }
}

module.exports = Transaction;