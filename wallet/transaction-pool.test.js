const TransactionPool = require('./transaction-pool');
const Wallet = require('./index');

describe('TransactionPool', () => {
  let pool, wallet, transaction;

  beforeEach(() => {
    pool = new TransactionPool();
    wallet = new Wallet();
    transaction = wallet.createTransaction('r4nd-4dr355', 30, pool);
  });

  it('adds a transaction to the pool', () => {
    expect(pool.transactions.find(t => t.id === transaction.id)).toEqual(transaction);
  });

  it('updates a transaction in the pool', () => {
    const prior = JSON.stringify(transaction);
    const t = transaction.update(wallet, 'foo-4ddr355', 40);

    pool.addOrUpdate(t);
    expect(JSON.stringify(pool.transactions.find(t => t.id === t.id))).not.toEqual(prior);
  });

  /*
  Create a situation where there is a mix of valid and corrupt transactions.
  */
  describe('mixing valid and corrupt transactions', () => {
    let validTransactions;

    beforeEach(() => {
      validTransactions = [...pool.transactions];

      for (let i = 0; i < 6; i++) {
        wallet = new Wallet();
        transaction = wallet.createTransaction('r4nd-4dr355', 30, pool);
        if (i % 2 == 0) {
          transaction.input.amount = 9999;
        } else {
          validTransactions.push(transaction);
        }
      }
    });

    it('shows a difference between valid and corrupt transactions', () => {
      expect(JSON.stringify(pool.transactions)).not.toEqual(JSON.stringify(validTransactions));
    });
  
    it('grabs valid transactions', () => {
      expect(pool.validTransactions()).toEqual(validTransactions);
    });

  });
});