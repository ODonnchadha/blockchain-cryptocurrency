const { WALLET_INITIAL_BALANCE } = require('../config');

/*
The keyPair object will contain methods that can return the private key for 
the wallet, as well as its public key.

The public key also serves as the public address for the wallet, and is what 
other individuals in the network use to send currency to the wallet.
*/
class Wallet {
  constructor() {
    this.balance = WALLET_INITIAL_BALANCE;
    this.keyPair = null;
    this.publicKey = null;
  }
  toString() {
    return `Wallet -
    publicKey : ${this.publicKey.toString()}
    balance   : ${this.balance}`
  }
}

module.exports = Wallet;