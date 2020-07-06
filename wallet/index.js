const { WALLET_INITIAL_BALANCE } = require('../config');
const ChainUtil = require('../chain-util');

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
  toString() {
    return `Wallet -
    publicKey : ${this.publicKey.toString()}
    balance   : ${this.balance}`
  }
}

module.exports = Wallet;