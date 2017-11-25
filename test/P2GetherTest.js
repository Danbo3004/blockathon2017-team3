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

    it("The P2Gether can be deployed", function () {
        return P2Gether.new()
            .then(function (instance) {
                assert.ok(instance.address);
            });
    });

    it("The P2Gether can't create plan if send 0 ether", async () => {
        const p2Gether = await P2Gether.new();

        // should be closed
        await assertExpectedError(p2Gether.createPlan.call({ from: args._user1, to: p2Gether.address, value: 0 }));
    });

    it("The P2Gether can create plan", function () {
        return P2Gether.new()
            .then(function (instance) {
                return instance.createPlan.call({ from: args._user1, to: instance.address, value: 1e18 * 2 });
            })
            .then(function (result) {
                assert.ok(result);
            })
        ;
    });

});