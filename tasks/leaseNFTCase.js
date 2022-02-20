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
  const { deployer, scholar } = await getNamedSigners();
  const ERC721Token = await getContract("ERC721Token");
  const NFTStaking = await getContract("NFTStaking");
  const Registry = await getContract("Registry");
  const DAI = await getContract("DAI");

  await ERC721Token.faucet();

  await ERC721Token.approve(NFTStaking.address, 1);
  await NFTStaking.stake(1, 7 * 24 * 60 * 60);

  await NFTStaking.leaseNFT(scholar.address, 1, 1);

  await DAI.connect(scholar).faucet();
  await DAI.connect(scholar).approve(Registry.address, parseUnits("1", 14));
  await Registry.connect(scholar).rent(
    [0],
    [ERC721Token.address],
    [1], // tokenID
    [1], // lendingId
    [1], // rentDuration uint8
    [1] // rent amount
  );
  await network.provider.send("evm_increaseTime", [25 * 60 * 60]);

  console.log((await DAI.balanceOf(deployer.address)).toString());

  // const bytes32=keccak256(defaultAbiCoder.encode([ "address", "uint256","uint256" ], [ ERC721Token.address, 1,1 ]))
  // console.log(await Registry.lendings(bytes32))


  // const StakeInfo = await NFTStaking.stakes(1);
  // console.log(StakeInfo);
  // console.log(await NFTStaking.getActiveScholars())
  
  await NFTStaking.claimNFT(1, 1);

  console.log((await DAI.balanceOf(deployer.address)).toString());

  await NFTStaking.claimRewards(1, "80000000000000");

  console.log((await DAI.balanceOf(deployer.address)).toString());
};
