/*
The proof-of-work system will deter dishonest contributors to the blockchain by requiring them to do 
computational work, thus, the 'difficulty' of the system for mining blocks.
*/
const DIFFICULTY = 4;

/*
Create a system that automatically adjusts the difficulty as more miners are added to the blockchain.
*/
const MINE_RATE = 3000;

/*
This variable will be a value every wallet begins with. This helps get the 'economy' flowing.
*/
const WALLET_INITIAL_BALANCE = 500;

module.exports = { DIFFICULTY, MINE_RATE, WALLET_INITIAL_BALANCE };