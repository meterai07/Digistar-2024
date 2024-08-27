const firstNonRepeatingChar = require('../index');

describe('firstNonRepeatingChar', () => {
    let expect;

    before(async () => {
        const chai = await import('chai');
        expect = chai.expect;
    });

    it('should return the first non-repeating character in a string', () => {
        expect(firstNonRepeatingChar('swiss')).to.equal('w');
        expect(firstNonRepeatingChar('stress')).to.equal('t');
        expect(firstNonRepeatingChar('teeter')).to.equal('r');
    });

    it('should return null if all characters repeat', () => {
        expect(firstNonRepeatingChar('aabbcc')).to.be.null;
    });

    it('should return null if the string is empty', () => {
        expect(firstNonRepeatingChar('')).to.be.null;
    });

    it('should handle strings with one character', () => {
        expect(firstNonRepeatingChar('a')).to.equal('a');
    });

    it('should handle strings with all unique characters', () => {
        expect(firstNonRepeatingChar('abc')).to.equal('a');
    });
});
