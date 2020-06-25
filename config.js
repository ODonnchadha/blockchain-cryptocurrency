/*
The proof-of-work system will deter dishonest contributors to the blockchain by requiring them to do 
computational work, thus, the 'difficulty' of the system for mining blocks.
*/
const DIFFICULTY = 4;

/*
Create a system that automatically adjusts the difficulty as more miners are added to the blockchain.
*/
const MINE_RATE = 3000;

module.exports = { DIFFICULTY, MINE_RATE };