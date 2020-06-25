const Blockchain = require('./blockchain');
const Block = require('./block');

describe('Blockchain', () => {
    let blockchain, blockchain2;

    beforeEach(() => {
        blockchain = new Blockchain();
        blockchain2 = new Blockchain();
    });

    it('starts with the genesis block', () => {
	    expect(blockchain.chain[0]).toEqual(Block.genesis());
    });

    it('adds a new block', () => {
        const data = 'foobar';
        blockchain.add(data);
        expect(blockchain.chain[blockchain.chain.length-1].data).toEqual(data);
    });

    it('validates a valid chain', () => {
        blockchain2.add('foo');
        expect(blockchain2.isValid(blockchain2.chain)).toBe(true);
    });

    it('invalidates a chain with a corrupt genesis block', () => {
        blockchain2.chain[0].data = 'Bad data';
        expect(blockchain.isValid(blockchain2.chain)).toBe(false);
    });

    it('invalidates a corrupt chain', () => {
        blockchain2.add('foo');
        blockchain2.chain[1].data = 'Not foo';
        expect(blockchain.isValid(blockchain2.chain)).toBe(false);
    });

    it('replaces the chain with a valid chain', () => {
        blockchain2.add('X');
        blockchain.replace(blockchain2.chain);
        expect(blockchain.chain).toEqual(blockchain2.chain);
    });
    
    it('does not replace the chain with one of less than or equal length', () => {
        blockchain.add('X');
        blockchain.replace(blockchain2.chain);
        expect(blockchain.chain).not.toEqual(blockchain2.chain);
    });
});