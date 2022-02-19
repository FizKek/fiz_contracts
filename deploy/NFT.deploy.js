const { providers } = require("ethers");

module.exports = async ({
  deployments: { deploy },
  ethers: { getNamedSigners },
}) => {
  const { deployer } = await getNamedSigners();

  await deploy("ERC721Token", {
    from: deployer.address,
    args: [],
    log: true,
  });
  // await run("userCase")
};
module.exports.tags = ["ERC721Token"];
module.exports.dependencies = ["Registry", "DAI"];
