var CrepeTokenX = artifacts.require("CrepeTokenX");

module.exports = function (deployer) {
  // deployment steps
  deployer.deploy(CrepeTokenX, "8000000000000000000000000");
};
