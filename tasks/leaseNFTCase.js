module.exports = async (
  { _ },
  {
    network,
    ethers: {
      getNamedSigners,
      getContract,
      getContractAt,
      utils: { parseEther, parseUnits },
    },
  }
) => {
  const { deployer, scholar } = await getNamedSigners();
  const ERC721Token = await getContract("ERC721Token");
  const NFTStaking = await getContract("NFTStaking");
  const Registry = await getContract("Registry");
  const DAI = await getContract("DAI");

  await ERC721Token.faucet();
  console.log(await ERC721Token.balanceOf(deployer.address));
  console.log(await ERC721Token.balanceOf(NFTStaking.address));

  await ERC721Token.approve(NFTStaking.address, 1);
  await NFTStaking.stake(1, 7 * 24 * 60 * 60);

  await NFTStaking.leaseNFT(scholar.address,1, 1);

  await DAI.connect(scholar).faucet()
  await DAI.connect(scholar).approve(Registry.address, parseUnits("1",14));
  await Registry.connect(scholar).rent(
    [0],
    [ERC721Token.address],
    [1], // tokenID
    [1], // lendingId
    [1], // rentDuration uint8
    [1] // rent amount
  );
};
