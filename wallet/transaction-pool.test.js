const TransactionPool = require('./transaction-pool');
const Transaction = require('./transaction');
const Wallet = require('./index');

describe('TransactionPool', () => {
  let pool, wallet, transaction;

  beforeEach(() => {
    pool = new TransactionPool();
    wallet = new Wallet();
    transaction = Transaction.create(wallet, 'r4nd-4dr355', 30);

    pool.addOrUpdate(transaction);
  });

  it('adds a transaction to the pool', () => {
    expect(pool.transactions.find(t => t.id === transaction.id)).toEqual(transaction);
  });

  it('updates a transaction in the pool', () => {
    const oldTransaction = JSON.stringify(transaction);
    const newTransaction = transaction.update(wallet, 'foo-4ddr355', 40);

    pool.addOrUpdate(newTransaction);
    expect(JSON.stringify(pool.transactions.find(t => t.id === newTransaction.id))).not.toEqual(oldTransaction);
  });
});