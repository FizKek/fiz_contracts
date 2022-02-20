module.exports = async ({ deployments: { deploy }, ethers:{getContract} }) => {
  const { deployer } = await getNamedAccounts();
  const Registry = await getContract("Registry");

  await deploy("NFTStaking", {
    from: deployer,
    args: [Registry.address],
    log: true,
  });
  // await run("stakingTest");
};

module.exports.tags = ["NFTStaking"];
module.exports.dependencies = ["ERC721Token","Registry"];
