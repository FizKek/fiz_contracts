module.exports = async ({
  deployments: { deploy },
  ethers: { getContract },
}) => {
  const { deployer } = await getNamedAccounts();

  const DAI=await deploy("DAI", {
    from: deployer,
    args: [],
    log: true,
  });

  const Resolver = await getContract("Resolver");

  await Resolver.setPaymentToken(1, DAI.address);
};
module.exports.tags = ["DAI"];
module.exports.dependencies = ["Resolver"];
