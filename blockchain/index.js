const Block = require('./block');

class Blockchain {
  /*
  Parameterless constructor. Array with genesis block.
  */
  constructor() {
    this.chain = [Block.genesis()];
  }

  /*
  data: The data we'd like to store. Access the last block within the chain.
  Generate a new block with the mine() function.
  Finally, return the block as a result of the add() function.
  */
  add(data) {
    const block = Block.mine(this.chain[this.chain.length-1], data);
    this.chain.push(block);

    return block;
  }

  /*
  Chain validation ensures that incoming chains are not corrupt once there are multiple contributors 
  to the blockchain. To validate a chain, make sure the incoming chain starts with the genesis block.
  Easiest and quickest to stringify(). Now, run validatations for each bock within the chain.
  Also, ensure that its hashes are generated properly. 
  The current block's lastHash must match the hash contained within the last block.
  Also, has the data been tampered with? 
  */
  isValid(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;

    for (let i = 1; i < chain.length; i++) {
      const block = chain[i];
      const lastBlock = chain[i - 1];
      if (
        block.lastHash !== lastBlock.hash ||
        block.hash !== Block.blockHash(block)
      ) {
        return false;
      }
    }
    
    return true;
  }

    /*
    If another contributor to a blockchain submits a valid chain, replace the current chain with the incoming chain. 
    Only replace chains that are actually longer than the current chain. Otherwise return;
    Also, is this new chain valid? Otherwise return;
    */
    replace(newChain) {
        if (newChain.length <= this.chain.length) {
          console.log('Received chain is not longer than the current chain.');
          return;
        } else if (!this.isValid(newChain)) {
          console.log('The received chain is not valid.');
          return;
        }
  
        console.log('Replacing blockchain with the new chain.');
        this.chain = newChain;
    }
}

module.exports = Blockchain;