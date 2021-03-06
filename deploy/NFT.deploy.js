const { providers } = require("ethers");

module.exports = async ({
  deployments: { deploy },
  ethers: { getContract, getNamedSigners },
}) => {
  const { deployer, staker } = await getNamedSigners();

  await deploy("ERC721Token", {
    from: deployer.address,
    args: [],
    log: true,
  });

  const ERC721Token = await getContract("ERC721Token");

  await ERC721Token.setBaseUri("https://drive.google.com/drive/folders/1khEGGhJ3QzvyJX5ulHmCSej0Sf-CCCMW?usp=sharing");
  // await run("userCase");
  await ERC721Token.connect(staker).faucet()
  console.log(staker)
};
module.exports.tags = ["ERC721Token"];
module.exports.dependencies = ["Registry", "DAI"];
