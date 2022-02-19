module.exports = async ({
  deployments: { deploy },
  ethers: { getContract },
}) => {
  const { deployer } = await getNamedAccounts();
  
  await deploy("NFTStaking", {
    from: deployer,
    args: [],
    log: true,
  });
  await run("stakingTest")
};

module.exports.tags = ["NFTStaking"];
module.exports.dependencies = ["ERC721Token"];
