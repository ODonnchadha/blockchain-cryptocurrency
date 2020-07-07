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
    Transaction.sign(transaction, senderWallet);

    return transaction;
  }

  /*
  Create the vital input object which provides information about the sender in the transaction. 
  This information includes the sender's original balance, his or her public key, and most important, 
  his or her signature for the transaction.
  */
  static sign(transaction, senderWallet) {
    transaction.input = {
      timestamp: Date.now(),
      amount: senderWallet.balance,
      address: senderWallet.publicKey,
      signature: senderWallet.sign(ChainUtil.hash(transaction.outputs))
    }
  }

  static verify(transaction) {
    return ChainUtil.verifySignature(
      transaction.input.address,
      transaction.input.signature,
      ChainUtil.hash(transaction.outputs)
    );
  }
}

module.exports = Transaction;