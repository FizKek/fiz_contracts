const { providers } = require("ethers");

module.exports = async ({
  network,
  deployments: { deploy },
  ethers: {
    getNamedSigners,
    getContract,
    getContractAt,
    utils: { parseEther },
  },
}) => {
  const { deployer } = await getNamedSigners();

  await deploy("E721", {
    from: deployer.address,
    args: [],
    log: true,
  });
};
module.exports.tags = ["E721"];
module.exports.dependencies = ["Registry", "DAI"];
