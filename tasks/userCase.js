module.exports = async (
  { _ },
  {
    network,
    ethers: {
      getNamedSigners,
      getContract,
      getContractAt,
      utils: { parseEther },
    },
  }
) => {
  const { deployer, scholar } = await getNamedSigners();
  const Resolver = await getContract("Resolver");
  const DAI = await getContract("DAI");
  const E721 = await getContract("E721");
  const Registry = await getContract("Registry");

  await Resolver.setPaymentToken(1, DAI.address);

  await E721.faucet();
  console.log(await E721.balanceOf(deployer.address));
  console.log(await E721.tokenByIndex(0));
  console.log(await E721.tokenURI(1));

  await E721.approve(Registry.address, 1);
  await DAI.connect(scholar).faucet();

  await Registry.lend(
    [0],
    [E721.address],
    [1], // tokenID
    [10], // lendamount
    [10], // rent duration uint8
    ["0x00000001"], // daily rent price
    [1]
  );

  await DAI.connect(scholar).approve(Registry.address, parseEther("1"));

  await Registry.connect(scholar).rent(
    [0],
    [E721.address],
    [1], // tokenID
    [1], // lendingId
    [10], // rentDuration uint8
    [1] // rent amount
  );

  // await Registry.connect(scholar).stopRent(
  //   [0],
  //   [E721.address],
  //   [1],// tokenID
  //   [1],// lendingId
  //   [1],// rentDuration uint8
  //   )
  await network.provider.send("evm_increaseTime", [11 * 24 * 60 * 60]);

  console.log("------");
  //   await Registry.stopLend(
  //     [0],
  //     [E721.address],
  //     [1],// tokenID
  //     [1],// lendingId
  //     )

  //   function stopRent(
  //     IRegistry.NFTStandard[] memory nftStandard,
  //     address[] memory nftAddress,
  //     uint256[] memory tokenID,
  //     uint256[] memory _lendingID,
  //     uint256[] memory _rentingID
  // )

  //   function stopLend(
  //     IRegistry.NFTStandard[] memory nftStandard,
  //     address[] memory nftAddress,
  //     uint256[] memory tokenID,
  //     uint256[] memory _lendingID
  // )
};
