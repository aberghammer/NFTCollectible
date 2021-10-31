// const Migrations = artifacts.require("Migrations");
//
// module.exports = function (deployer) {
//   deployer.deploy(Migrations);
// };

const NFTCollectible = artifacts.require("NFTCollectible");

module.exports = function (deployer) {
  deployer.deploy(NFTCollectible);
};
