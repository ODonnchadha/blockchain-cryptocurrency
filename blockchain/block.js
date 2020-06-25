const SHA256 = require('crypto-js/sha256')

class Block {
    constructor(timestamp, lastHash, hash, data) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
    }

    /*
    Every blockchain starts with the "genesis block:" A default 'dummy' block to originate the chain.
    */
    static genesis() {
        return new this('Genesis', 'G', 'Genesis', []);
    }

    /*
    Hashing function generates a unique value for the combination of data attributes in the block.
    Hash is based upon its own timestamp, the data it stores, and the hash of the block that came before it.
    */
    static hash(timestamp, lastHash, data) {
	    return SHA256(`${timestamp}${lastHash}${data}`).toString();
    }

    /*
    Generate a block based off of some provided data to store and the associated previous block.
    */
    static mine(lastBlock, data) {
        const timestamp = Date.now();
        const lastHash = lastBlock.hash;
        const hash = Block.hash(timestamp, lastHash, data);
        return new this(timestamp, lastHash, hash, data);
    }

    /*
    This will generate the hash of a block based only on its instance.
    */
    static blockHash(block) {
        const { timestamp, lastHash, data } = block;
        return Block.hash(timestamp, lastHash, data);
    }

    /*
    Software driver. Used for testing.
    */
    toString() {
        return `Block -
            Timestamp : ${this.timestamp}
            Last Hash : ${this.lastHash.substring(0, 10)}
            Hash      : ${this.hash.substring(0, 10)}
            Data      : ${this.data}`;
    }
}

module.exports = Block;