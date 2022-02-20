module.exports = async (
    { _ },
    {
      network,
      ethers: {
        getNamedSigners,
        getContract,
        getContractAt,
        utils: { keccak256, parseUnits, defaultAbiCoder },
      },
    }
  ) => {
    await network.provider.send("evm_increaseTime", [25 * 60 * 60]);
  };
  