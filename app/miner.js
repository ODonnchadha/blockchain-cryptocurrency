class Miner {
  constructor(blockchain, pool, wallet, peer) {
    this.blockchain = blockchain;
    this.pool = pool;
    this.wallet = wallet;
    this.peer = peer;
  }

  mine() {
    const validTransactions = this.pool.validTransactions();
  }
}

module.exports = Miner;