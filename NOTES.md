## Overview
```javascript
    npm i -g npm-check-updates
    ncu
```
- Build a Blockchain and a Cryptocurrency from Scratch. Learn by building. 
- Motivation:
    - Growing need for blockchain engineers.
- Roapmap:
    1. Code the core blockchain.
    2. Build an API around the blockchain.
    3. Create a dynamic P2P server.
    4. Implement a proof-of-work system to balance users.
    5. Create a transaction system for cryptocurrency.
- Technologies:
    - NodeJS with a focus on testing.

- What and why?
    1. Blockchain: 
    - Distributed and decentralized ledger that stores data, such as transactions, and that ledger is publically shared across all of the nodes within its network.
    - Every block is given an unique value called the hash. Hash is built upon the unique data that we want to store.
    - Unique hash of the last block is leveraged for the *new* block and will have that reference.
    - Links are created because a new block references the last block. Thus, a chain of blocks.
    2. Ledger: A record-keeping book that stores all of the transactions of an organization.
        - The blockchain is a distributed ledger.
    3. Distributed: 
        - Shared with everyone using the blockchain network. A complete copy of the ledger is with everyone.
        And then will then receive updates. Everyone has a copy. There is not *ONE* central organization.
    4. Decentralized: Everyone records the data and has equal power. Fair and transparent. Trustless.
        - CENTRALIZED:
            a. One entity records the data.
            b. The central entity has a lot of power.
            c. Full authority to fine or reward.
            d. Complete trust with the entity.
        - DECENTRALIZED:
            a. Trustless. You only trust the 'system' itself.
            b. Everyone records the data.
            c. Everyone has equal power.
            d. Fair and transparent system.
    5. Why use blockchain?
        - Decentralization leads to a trustless system.
        - No middlemen and no fees.
        - Highly secure with no central point of failure.
        - Dependable data.

- Blockchain in practice: (Use cases.)
    1. Cryptocurrency: 
        - Digital medium of exchange. 
        - Three main aspects:
            a. Secure Blockchain.
                - Uses cryptography to generate digital signatures.
                - Digital signatures:
                    - Private Key: Only the one individual has access to.
                    - Public Key: Key used to identify the 'one' individual.
            b. Secure Wallets.
                - Objects that store the orivate and public key of an individual.
                - The public key is used as a address of the wallet.
                - Helps sign transactions.
            c. Concept of mining.
    2. Using cryptography to generate digital signatures.
    3. Digital signature: (a) Private Key (that one ndividual ahs access to) and (b) Public Key.
    - Private Key + hash value (with original data) = signature.
    - Public Key is used to decrypt the signature and read the original data.
    4. Wallets. Store the private key and the public key of an individual. The public key is the address.
    5. Mining:
        - Adding transaction to the blockchain. Unconfirmed transactions are sent to the network.
        - Include blocks of transactions by solving a "proof of work" algorithm.
            - Difficult to solve and computationally expensive. (Time consuming.)
            - Once solved, the miner can add the block and other miners will then varify.

- Mining:
    1. Adding transactions to the bloackchain. Confirmed and added. 
    2. Transactions are temporary "unconfirmed."
    3. Include blocks of transactions by solving a "proof of work" algorithm.
        - Difficult to solve. Computationally expensive.
        - Once solved, the miner can add the block and other miners will verify.
        - Miners are *rewarded* for adding a block to the chain. 
            - (Versus electricity and hardware requirements.)
        - Miners are rewarded for adding a block to the chain. (Via cryptocurrency.)
        - The difficulty can adjust to control the rate of new blocks coming in.
        - "Mining Rigs." Super computers.
    4. Bitcoin. The furst decentralized cryptocurrency in 2009.
        - Great growth, and widespread in adoption.
        - Ethereum, ripple, iota, litecoin. Same core concepts of mining to support.
    5. Also (Additional Use Cases):
        - Blockchain-based voting registers.
        - Blockchain-supported documentation and identification systems.
    6. *"Will this really change the world?"*

- Original white paper of Bitcoin: bitcoin.pdf
    - October 31, 2008. The "mysterious" Satashi Nakamoto. 
    - Eight (8) pages divided into tweleve (12) sections.
    - A peer-to-peer electronic cash system.
    - Timestamp Server:
        - Necessary component to order blocks within the chain.

## Build The Blocks
```javascript
    npm init -y
    npm i nodemon --save-dev
```
- Nodemon: Live development server with automatic reload.
- Block:
    - Most fundamental unit. At the four, four (4) fundamental pieces of data.
    1. Timestamp in milliseconds. JavaScript date object.
    2. lastHash. The hash of the block before it. Unique value generated on a comnbination of all unique data.
    3. Hash. Based upon its own data.
    4. The data to store. Can be: string. number array. object.

- Genesis Block:
    - Within project, make classes for objects so that we can then make instances of those objects. ES6 JS class.
    - What about the first block? The Genesis block is the origin. Hard-coded "dummy" block.
    1. Block hashes and SHA-256.
        - The hash is generated from the timestamp, lastHash, and stored data.
        - Produces an unique 32-byte (256 bit) hash value for unique data inputs.
        - One-way hash. Useful for block validation. "Pretty much impossible" to decrypt.
        - Useful for block validation.
        ```javascript
            npm i crypto-js --save
        ```
    - Set-up a test environment.
    - Install the test runner and execute testing files within the project. See: ./blockchain/block.test.js
        ```javascript
            npm i jest --save-dev
        ```
        - Set up server that lsitens to changes and reruns the entire suite when a changed file is detected.
        ```javascript
            "scripts": {
                "test": "jest --watchAll"
            }
        ```


## Build The Chain
- Multiple chain validation.
    - Multiple contributors will be adding to the blockchain. Each minr will have their own version of the chain.
    - Miners will have to submit their new block, ensure that it is valid, and then accept those changes.
    - By accpeting longer chains that come in, we avoid forks.
    - If a block is created at the same time based off of the same last block, the overall system will need to come to an agreement.
    - Once a miner extends a chin by making a longer chain based off of one of the *new*, competing blocks, the fork is resolved.
    - Hash validation comes in to play. Was the data tampered with?
- Chain validation:
    - Choosing the longer chain resolves:
        - Forking: Where two blockchains submit the samre block at the same time.

## Develop the Blockchain Application
```javascript
    npm i express --save
    npm i body-parser --save
```

## Peer-to-Peer Server
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
    ```javascript
        npm i elliptic --save
        npm i uuid --save
    ```
- Tell third party dependencies that a browser will not be involved during the unit testing within package.json
```javascript
  "jest": {
    "testEnvironment": "node"
  },
```

## Transaction Pool:
 - An object that contains all new transaction submitted by individuals.
 - Unconfirmed transactions. Miners create blocks and confirm transactions. A new block, then, in the transaction.
 - There will be a brief period when the transaction is inconfirmed. 
 - Decentralized blockchain history.

 ## Miners:
 - A miner will take thansactions from the pool and store them into blocks.
 - Miners receive rewards for mining.
 - Transaction move from "unconfirmed" in the pool to "confirmed" in the chain.