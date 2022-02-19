const { providers } = require("ethers");

module.exports = async ({
  deployments: { deploy },
  ethers: { getNamedSigners },
}) => {
  const { deployer } = await getNamedSigners();

  await deploy("E721", {
    from: deployer.address,
    args: [],
    log: true,
  });
  await run("userCase")
};
module.exports.tags = ["E721"];
module.exports.dependencies = ["Registry", "DAI"];
