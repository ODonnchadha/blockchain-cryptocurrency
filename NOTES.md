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