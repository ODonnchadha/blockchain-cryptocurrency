## Overview
- Build a Blockchain and a Cryptocurrency from Scratch. Learn by building. Growing need for blockchain engineers.
- Roapmap:
    1. Core Blockchain.
    2. API around the blockchain.
    3. Dynamic P2P server.
    4. Implement as a POC.
    5. Create a transaction system for cryptocurrency.
    - Node.js. With testing.
- What and why?
    1. Blockchain: Distributed and decentralized ledger that stores data, such as transactions, snd is publically shared across all of the nodes within its network.
    - Every block is given an unique value called the hash. Hash is built upon the unique data that we want to store.
    - Unique hash of the last block is leveraged for the *new* block and will have that reference.
    2. Ledger: A record-keeping book that stores all of the transactions of an organization.
    3. Distributed: 
    4. Decentralized: Everyone records the data and has equal power. Fair and transparent. Trustless.
    5. Why? No middlemen and no fees. Highly secure with no central point of failure. Dependable data.
- Blockchain in practice:
    1. Cryptocurrency: Digital medium of exchange. (a) Secure Blockchain. (b) Secure Wallets. (c) Concept of mining.
    2. Using cryptography to generate digital signatures.
    3. Digital signature: (a) Private Key (that one ndividual ahs access to) and (b) Public Key.
    - Private Key + hash value (with original data) = signature.
    - Public Key is used to decrypt the signature and read the original data.
    4. Wallets. Store the private key and the public key of an individual. The public key is the address.
    5. Mining:
- Mining:
    1. Adding transactions to the bloackchain. Confirmed and added. 
    2. Transactions are temporary "unconfirmed."
    3. Include blocks of transactions by solving a "proof of work" algorithm.
    - Difficult to solve. Computationally expensive.
    - Once solved, the miner can add the block and other miners will verify.
    - Miners are rewarded for adding a block to the chain.
    - The difficulty can adjust to control the rate of new blocks coming in.
    4. Bitcoin. The furst decentralized cryptocurrency in 2009.
    - Great growth, and widespread in adoption.
    - Ethereum, ripple, iota, litecoin. Same core concepts of mining to support.
    5. Also:
    - Blockchain-based voting registers.
    - Blockchain-supported documentation and identification systems.
    6. "Will this really change the world?"
- Original white paper of Bitcoin:
    - October 31, 2008. Satashi Nakamoto. Eight (8) pages divided into tweleve (12) sections.
    - A peer-to-peer electronic cash system.

## Build The Blocks
```javascript
    npm init -y
    npm i nodemon --dev-save
```
- Block:
    1. Timestamp in milliseconds
    2. lastHash. The hash of the block before it.
    3. Hash. Based upon its own data.
    4. The data to store.
- Genesis Block:
    - What about the first block? The Genesis block is the origin. Hard-coded "dummy" block.
    1. Block hashes and SHA-256.
    - The hash is generated from the timestamp, lastHash, and stored data.
    - Produces an unique 32-byte (256 bit) hash vaue for unique data inputs.
    - One-way hash. Useful for block validation.
    ```javascript
        npm i crypto-js --save
    ```
- Test Runner:
    ```javascript
        npm i jest --save-dev
    ```

## Build The Chain

## Develop the Blockchain Application
```javascript
    npm i express --save
    npm i body-parser --save
```

## Peer-to-Peer server
- We'll be using WebSockets. Ensure that a connected "peer" has the latest blockchain.
1. Create a Websocket server.
```javascript
    npm i ws --save
```

## Proof of Work System
- A system that requires miners to do computational work to add blocks.
- Any per can replace the blockchain.
- The proof-of-work makes it expensive to generate corrupt chains.
- Manageable to submit one block. Unproductive to generate an entire chain.
1. e.g.:
    - Hashcash was a proof-of-work system to prevent email spamming. Difficulty = 6.
2. Proof of Work System:
    - The difficulty sets a rate of mining.
    - Bitcoin sets the rate to a new block around every 10 minutes.
3. 51% attack:
    - A dishonest miner has more thatn at leaast 51% of the network's power.
    - 1 51% attack for bitcoin would be more than $6 billion (start of 2018.)
4. Dynamic Block Difficulty.
    - Difficulty. And timestamp on newly-timed block. Draw a comparison wtih a mine rate.

## Wallets, Keys, & Transactions:
- What is a digital wallet?
    1. Wallets store the balance of an individual. 
    2. They store an individul's keys: 
        - Private key used to generate signatures. 
        - Public key used to verify signatures. Also, the public address.
- Transactions:
    1. Input: Timestamp, starting balance, sender's public key.
    2. Output: Amount. Address.
- Digital signatures:
    1. Private key:
    2. Public key:
- Blockchain-powered Cryptocurrencies:
- Contain wallet objects.
- Keys for digital signatures and verification.
- Have transaction objects to represent currency exchange.