module.exports = async ({
  deployments: { deploy },
  ethers: { getContract },
}) => {
  const Resolver = await getContract("Resolver");
  const { deployer } = await getNamedAccounts();

  await deploy("Registry", {
    from: deployer,
    args: [Resolver.address, deployer, deployer],
    log: true,
  });
};
module.exports.tags = ["Registry"];
module.exports.dependencies = ["Resolver"];
