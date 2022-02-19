module.exports = async ({ deployments: { deploy } }) => {
  const { deployer } = await getNamedAccounts();
  await deploy("Resolver", {
    from: deployer,
    args: [deployer],
    log: true,
  });
};
module.exports.tags = ["Resolver"];
