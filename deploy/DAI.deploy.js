module.exports = async ({
  deployments: { deploy },
  ethers: { getContract },
}) => {
  const { deployer } = await getNamedAccounts();

  await deploy("DAI", {
    from: deployer,
    args: [],
    log: true,
  });
};
module.exports.tags = ["DAI"];
module.exports.dependencies = ["Resolver"];
