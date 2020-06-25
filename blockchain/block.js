const SHA256 = require('crypto-js/sha256')
const { DIFFICULTY, MINE_RATE } = require('../config');

class Block {
    constructor(timestamp, lastHash, hash, data, nonce, difficulty) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty || DIFFICULTY;
    }

    /*
    Every blockchain starts with the "genesis block:" A default 'dummy' block to originate the chain.
    */
    static genesis() {
        return new this('Genesis', 'G', 'Genesis', [], 0, DIFFICULTY);
    }

    /*
    Hashing function generates a unique value for the combination of data attributes in the block.
    Hash is based upon its own timestamp, the data it stores, and the hash of the block that came before it.
    */
    static hash(timestamp, lastHash, data, nonce, difficulty) {
        return SHA256(`${timestamp}${lastHash}${data}${nonce}${difficulty}`).toString();
    }

    /*
    Generate a block based off of some provided data to store and the associated previous block.
    */
    static mine(lastBlock, data) {
        let hash, timestamp;
        let { difficulty } = lastBlock;
        let nonce = 0;
    
        const lastHash = lastBlock.hash;

        /*
        Proof of Work condition: Leading 0s to match the difficultity.
        This will run until the DIFFICULTY is met.
        So, blocks are generated with the proper hash value to match our leading 0 condition.
        By adding a loop to generate these hash values, to we are demanding that the node requesting
        to mine a block is actually spending computational power and time to find this hash value.
        */
        do {
            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty(lastBlock, timestamp);
            hash = Block.hash(timestamp, lastHash, data, nonce, difficulty);
        } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));
    
        return new this(timestamp, lastHash, hash, data, nonce, difficulty);
    }

    /*
    Raise the difficulty if the block was mined too quickly. 
    Or lower the difficulty if the block was not mined quick enough.
    */
    static adjustDifficulty(lastBlock, currentTime) {
        let { difficulty } = lastBlock;
        difficulty = lastBlock.timestamp + MINE_RATE > currentTime ? difficulty + 1 : difficulty - 1;
        return difficulty;
    }

    /*
    This will generate the hash of a block based only on its instance.
    */
    static blockHash(block) {
        const { timestamp, lastHash, data, nonce, difficulty } = block;
        return Block.hash(timestamp, lastHash, data, nonce, difficulty);
    }

    /*
    Software driver. Used for testing.
    */
    toString() {
        return `Block -
            Timestamp   : ${this.timestamp}
            Last Hash   : ${this.lastHash.substring(0, 10)}
            Hash        : ${this.hash.substring(0, 10)}
            Nonce       : ${this.nonce}
            Difficulty  : ${this.difficulty}
            Data        : ${this.data}`;
    }
}

module.exports = Block;