var P2Gether = artifacts.require("./P2Gether.sol");

const transaction = (address, wei) => ({
    from: address,
    value: wei
});
const ethBalance = (address) => web3.eth.getBalance(address).toNumber();
const toWei = (number) => number * Math.pow(10, 18);
const fail = (msg) => (error) => assert(false, error ? `${msg}, but got error: ${error.message}` : msg);
const assertExpectedError = async (promise) => {
    try {
        await promise;
        fail('expected to fail')();
    } catch (error) {
        assert(error.message.indexOf('invalid opcode') >= 0, `Expected throw, but got: ${error.message}`);
    }
}
const timeController = (() => {

    const addSeconds = (seconds) => new Promise((resolve, reject) =>
        web3.currentProvider.sendAsync({
            jsonrpc: "2.0",
            method: "evm_increaseTime",
            params: [seconds],
            id: new Date().getTime()
        }, (error, result) => error ? reject(error) : resolve(result.result)));

    const addDays = (days) => addSeconds(days * 24 * 60 * 60);

    const currentTimestamp = () => web3.eth.getBlock(web3.eth.blockNumber).timestamp;

    return {
        addSeconds,
        addDays,
        currentTimestamp
    };
})();

contract('P2GetherTestGeneric', function (accounts) {
    const args = { 
        _default: accounts[0], 
        _owner: accounts[1],
        _user1: accounts[2],
        _user2: accounts[3],
        _user3: accounts[4],
    };

    let plainId = "123a";
    let p2Gether;

    /* Do something before every `describe` method */
    beforeEach(async function () {
        p2Gether = await P2Gether.new(); 
    });

    it("The P2Gether can be deployed", async function () {
        assert.ok(p2Gether.address);
    });

    it("The P2Gether can't create plan if send 0 ether", async function () {
        // should be closed
        await assertExpectedError(p2Gether.createPlan.sendTransaction(plainId, { from: args._user1, to: p2Gether.address, value: 0 }));
    });

    it("The P2Gether can create plan if send > 0 ether", async function () {
        plan = await p2Gether.createPlan.sendTransaction(plainId, { from: args._user1, to: p2Gether.address, value: toWei(2) });
        assert.equal(web3.eth.getBalance(p2Gether.address).toString(), toWei(2));
    });

    it("The P2Gether can join plan if send != price", async function () {
        plan = await p2Gether.createPlan.sendTransaction(plainId, { from: args._user1, to: p2Gether.address, value: toWei(2) });
        await assertExpectedError(p2Gether.joinPlan.sendTransaction(0, { from: args._user2, to: p2Gether.address, value: toWei(1) }));
    });

    it("The P2Gether can join plan if send = price", async function () {
        plan = await p2Gether.createPlan.sendTransaction(plainId, { from: args._user1, to: p2Gether.address, value: toWei(2) });
        await p2Gether.joinPlan.sendTransaction(plainId, { from: args._user2, to: p2Gether.address, value: toWei(2) });
        assert.equal(web3.eth.getBalance(p2Gether.address).toString(), toWei(4));
    });

    it("The P2Gether can create plan if send > 0 ether", async function () {
        plan = await p2Gether.createPlan.sendTransaction(plainId, { from: args._user1, to: p2Gether.address, value: toWei(2) });
        assert.equal(web3.eth.getBalance(p2Gether.address).toString(), toWei(2));
    });

    it("The P2Gether", async function () {
        plan = await p2Gether.createPlan.sendTransaction(plainId, { from: args._user1, to: p2Gether.address, value: toWei(2) });
        await p2Gether.joinPlan.sendTransaction(plainId, { from: args._user2, to: p2Gether.address, value: toWei(2) });
        assert.equal(web3.eth.getBalance(p2Gether.address).toString(), toWei(4));

        plan = await p2Gether.startPlan(plainId, { from: args._user1, to: p2Gether.address});
        assert.equal(web3.eth.getBalance(p2Gether.address).toString(), 0);
    });

});
