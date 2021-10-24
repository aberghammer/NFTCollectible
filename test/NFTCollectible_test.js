const assert = require("assert");
const { BN, expectEvent, expectRevert } = require("@openzeppelin/test-helpers");
const NFTCollectible = artifacts.require("NFTCollectible");

contract("NFTCollectible", (accounts) => {
  before(async function () {
    this.nftcollectible = await NFTCollectible.new();
  });
  it("check owner", async function () {
    console.log(accounts[0]);
    assert.equal(await this.nftcollectible.owner(), accounts[0]);
  });
  it("mint from web without enough eth", async function () {
    try {
      await this.nftcollectible.mintTokenFromWeb(1, {
        from: accounts[1],
        value: new BN(0),
      });
      assert.false;
    } catch (err) {
      //console.log(err);
      assert.equal("not enough ether was sent!", err.reason);
    }
  });
  it("mint more than three tokens", async function () {
    try {
      await this.nftcollectible.mintTokenFromWeb(4, {
        from: accounts[1],
        value: web3.utils.toWei("0.2", "ether"),
      });
    } catch (err) {
      assert.equal("you can only mint three tokens per account!", err.reason);
    }
  });
  it("mint three tokens from web without error", async function () {
    await this.nftcollectible.mintTokenFromWeb(3, {
      from: accounts[1],
      value: web3.utils.toWei("0.15", "ether"),
    });
    assert.equal(await this.nftcollectible.balanceOf(accounts[1]), 3);
  });
  it("get eth from contract -> no owner", async function () {
    try {
      await this.nftcollectible.withdraw(accounts[1], { from: accounts[1] });
      assert.false;
    } catch (err) {
      assert.equal("Ownable: caller is not the owner", err.reason);
    }
  });
  it("get eth from contract as owner", async function () {
    await this.nftcollectible.mintTokenFromWeb(3, {
      from: accounts[3],
      value: web3.utils.toWei("0.15", "ether"),
    });
    var balanceBefore = await web3.eth.getBalance(accounts[0]);
    await this.nftcollectible.withdraw(accounts[0], { from: accounts[0] });
    var balanceAfter = await web3.eth.getBalance(accounts[0]);
    assert.ok(balanceAfter > balanceBefore);
  });
});
