var DealContract = artifacts.require("./Deal.sol");
var P2GetherContract = artifacts.require("./P2Gether.sol");

module.exports = function(deployer) {
  deployer.deploy(DealContract);
  deployer.deploy(P2GetherContract);
};
