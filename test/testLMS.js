'use strict';


var LMS = artifacts.require('../contracts/LMS.sol');

contract('LMS', function() {
    let lms;

    beforeEach(async function() {
        lms = await LMS.new('Lallan');
    });

    it('should have a default member', async function() {
        let memberCount = await lms.numMembers();
        assert.equal(memberCount, 1);
    });

    it('should have no books by default', async function() {
        let bookCount = await lms.numBooks();
        assert.equal(bookCount, 0);
    });

    describe('getMemberDetails', function() {
        it('should provide member details', async function() {
            await lms.addMember("John Doe", 0x0);
            let [name, account, status] = await lms.getMemberDetails(0x0);
            assert.equal(name, 'John Doe');
            assert.equal(account, 0x0);
            assert.equal(status.valueOf(), 0);
        });
    });

    describe('getOwnerDetails', function() {
        it('should provide owner details', async function() {
            let [name, account, status] = await lms.getOwnerDetails();
            assert.equal(name, 'Lallan');
            assert.equal(account, web3.eth.coinbase);
            assert.equal(status.valueOf(), 0);
        });
    });

    describe('addMember', function() {
        it('should add a member', async function() {
            await lms.addMember("Top", 0x0);
            let memberCount = await lms.numMembers();
            assert.equal(memberCount.valueOf(), 2);
        });
    });

    describe('addBook', function() {
        it('should add a book', async function() {
            await lms.addBook("title", "author", "publisher");
            let bookCount = await lms.numBooks();
            assert.equal(bookCount, 1);
            let [books, count] = await lms.getMyBooks();
            console.log(books);
            assert.equal(count, 1);
            let book = books.split('|')[0];
            let bookAttr = book.split(';');
            assert.equal(bookAttr[0], 'title');
            assert.equal(bookAttr[1], 'author');
            assert.equal(bookAttr[2], 'publisher');
//            assert.equal(bookAttr[3], web3.eth.coinbase);
//            assert.equal(bookAttr[4], 0);
//            assert.equal(bookAttr[6], 0);
        });
    });

    it.skip('should return two values', async function() {
//        let [a, b] = await lms.testing(3, 4);
//        assert.equal(a.valueOf(), 3);
//        assert.equal(b.valueOf(), 4);
        let asdf = await lms.testing(3, 4);
        assert.equal(asdf, "book;worm");
    });
});