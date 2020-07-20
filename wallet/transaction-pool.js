/*
A transaction pool will collect all transactions submitted by individuals in the cryptocurrency network. 
Then miners will do the work of taking transactions from the pool and including them in the blockchain.
*/
class TransactionPool {
  constructor() {
    this.transactions = [];
  }

  /*
  By default this method will add an incoming transaction to the transactions array.
  However, there is the possibility that a transaction could come in that already exists in the array.
  Why?
  Recall that there is the ability to update transactions to have additional outputs.
  This means that a transaction could exist in the pool.
  However, if it gets updated and is resubmitted to the pool, that transaction shouldn't appear twice.
  */
  addOrUpdate(transaction) {
    let id = this.transactions.find(t => t.id === transaction.id);
    if (id) {
      this.transactions[this.transactions.indexOf(id)] = transaction;
    } else {
      this.transactions.push(transaction);
    }
  }

  existingTransaction(address) {
    return this.transactions.find(transaction => transaction.input.address === address);
  }
}

module.exports = TransactionPool;