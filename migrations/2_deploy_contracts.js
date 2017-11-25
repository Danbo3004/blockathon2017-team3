var DealContract = artifacts.require("./Deal.sol");
var P2Gether = artifacts.require("./P2Gether.sol");

module.exports = function(deployer) {
  deployer.deploy(P2Gether);
};
