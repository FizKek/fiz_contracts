const { task } = require("hardhat/config");

task("userCase", "---", require("./userCase.js"));
task("stakingTest", "---", require("./stakingTest.js"));
task("leaseNFTCase", "---", require("./leaseNFTCase.js"));
task("increaseTime", "---", require("./increaseTime.js"));

//   .addParam("positionManager", "PositionManager contract", "PositionManager")
//   .addParam("traderBalanceVault", "TraderBalanceVault contract", "TraderBalanceVault");
