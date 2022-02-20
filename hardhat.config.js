require("dotenv").config();

require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-deploy");

require("./tasks");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.12",
  networks: {
    hardhat: {
      chainId: 1337,
      // accounts: [process.env.PRIVATE_KEY],
    },
    localhost: {
      url: "http://127.0.0.1:8545/"
      // accounts: [process.env.PRIVATE_KEY],
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    scholar: {
      default: 1,
    },
    staker: {
      default: 2,
    }
  },
  solidity: {
    compilers: [
      {
        version: "0.8.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.8.7",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};
