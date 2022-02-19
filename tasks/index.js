const { task } = require("hardhat/config");

task("userCase", "---", require("./userCase.js"));
task("stakingTest", "---", require("./stakingTest.js"));
//   .addParam("positionManager", "PositionManager contract", "PositionManager")
//   .addParam("traderBalanceVault", "TraderBalanceVault contract", "TraderBalanceVault");
