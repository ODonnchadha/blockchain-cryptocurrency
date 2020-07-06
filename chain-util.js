const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

/*
The class will collect helper methods that expose common functions that wrap around 
functions from elliptic. A few classes in the project will use these functions.
*/
class ChainUtil {
  static genKeyPair() {
    return ec.genKeyPair();
  }
}

module.exports = ChainUtil;