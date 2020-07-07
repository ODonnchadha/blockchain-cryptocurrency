const SHA256 = require('crypto-js/sha256');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const uuid = require('uuid');

/*
The class will collect helper methods that expose common functions that wrap around 
functions from elliptic. A few classes in the project will use these functions.
*/
class ChainUtil {

  static genKeyPair() {
    return ec.genKeyPair();
  }
  
  static id() {
    return uuid.v1.id;
  }

  static hash(data) {
    return SHA256(JSON.stringify(data)).toString();
  }
}

module.exports = ChainUtil;