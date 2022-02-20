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
    const { deployer } = await getNamedSigners();
    const ERC721Token = await getContract("ERC721Token");
    const NFTStaking = await getContract("NFTStaking");
  
    await ERC721Token.faucet();
    console.log(await ERC721Token.balanceOf(deployer.address));
    console.log(await ERC721Token.balanceOf(NFTStaking.address));
  
    await ERC721Token.approve(NFTStaking.address, 1);
    await NFTStaking.stake( 1, 7 * 24 * 60 * 60);
  
    await NFTStaking.leaseNFT(1,2)
  };
  