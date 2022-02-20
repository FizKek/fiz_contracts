module.exports = async ({ deployments: { deploy }, ethers:{getContract} }) => {
  const { deployer } = await getNamedAccounts();
  const Registry = await getContract("Registry");
  const ERC721Token = await getContract("ERC721Token");

  await deploy("NFTStaking", {
    from: deployer,
    args: [Registry.address,ERC721Token.address],
    log: true,
  });
  // await run("stakingTest");
  // await run("leaseNFTCase");

};

module.exports.tags = ["NFTStaking"];
module.exports.dependencies = ["ERC721Token","Registry"];
