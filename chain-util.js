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

  /*
  data: `${timestamp}${lastHash}${data}`
  */
  static hash(data) {
    return SHA256(JSON.stringify(data)).toString();
  }

  /*
  With transactions generating signatures based upon their outputs and their private keys:
  This function provides a manner in which to verify the authenticity of those signature(s).
  */
  static verifySignature(publicKey, signature, hash) {
    return ec.keyFromPublic(publicKey, 'hex').verify(hash, signature);
  }
}

module.exports = ChainUtil;