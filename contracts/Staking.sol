// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./interfaces/IRegistry.sol";
import "./interfaces/IResolver.sol";

contract NFTStaking is Ownable, ERC721Holder {
    IRegistry availableProtocol;
    // user deposits are recorded in StakeInfo[] stakes struct
    struct StakeInfo {
        // staked is true if token is staked and hasn't been unstaked.
        // After user claims his stake back, `staked` becomes false
        bool staked;
        // address of staked token's owner
        address stakerAddress;
        // time of start staking token
        uint256 expirationTime;
        // totalYield is a total value of rewards for the given stake.
        // user is able to withdraw yield.
        uint256 totalYield;
        // The amount of yield user already harvested
        uint256 harvestedYield;
    }

    // Token used for rewards
    IERC20 public fizToken;

    constructor(IRegistry _protocol) {
        availableProtocol = _protocol;
    }

    // The token accepted for staking
    mapping(address => bool) public awailableTokens;

    // struccture that stores the records of users' stakes
    mapping(uint256 => StakeInfo) public stakes;
    // struccture that stores the records of users' staked tokens
    mapping(address => uint256[]) public stakedTokens;

    event Stake(address indexed user, uint256 indexed tokenId);
    event Unstake(address indexed user, uint256 indexed tokenId);

    /**
     * @dev submit the stake
     * @param _tokenId id of hero token
     */
    function stake(
        address tokenAddress,
        uint256 _tokenId,
        uint256 expirationTime
    ) external {
        require(
            expirationTime >= 1 weeks,
            "expirationTime must be more then 1 week"
        );
        stakes[_tokenId].staked = true;
        stakes[_tokenId].stakerAddress = msg.sender;
        stakes[_tokenId].expirationTime = block.timestamp + expirationTime;

        stakedTokens[msg.sender].push(_tokenId);
        emit Stake(msg.sender, _tokenId);
        IERC721(tokenAddress).safeTransferFrom(
            msg.sender,
            address(this),
            _tokenId
        );
    }

    /**
     * @dev withdraw the user's staked token
     * @param _tokenId id of hero token
     */
    function unstake(address tokenAddress, uint256 _tokenId) external {
        require(
            msg.sender == stakes[_tokenId].stakerAddress,
            "Sender is not staker"
        );
        require(stakes[_tokenId].staked, "Unstaked already");
        stakes[_tokenId].staked = false;
        stakes[_tokenId].stakerAddress = address(0);

        // Since `delete` Solidity operator leaves zeroes at the deleted index and
        // doesn'd decrease array length.
        // To actually drop data and shorten the list, we copy last item to the index
        // of removed value (overwriting it) then pop last element to decrease array size
        for (uint256 i = 0; i < stakedTokens[msg.sender].length; ++i) {
            if (stakedTokens[msg.sender][i] == _tokenId) {
                uint256 lastElementIndex = stakedTokens[msg.sender].length - 1;
                stakedTokens[msg.sender][i] = stakedTokens[msg.sender][
                    lastElementIndex
                ];
                stakedTokens[msg.sender].pop();
                break;
            }
        }

        emit Unstake(msg.sender, _tokenId);
        IERC721(tokenAddress).safeTransferFrom(
            address(this),
            msg.sender,
            _tokenId
        );
    }

    function claim(uint256 _tokenId) external {}

    function leaseNFT(
        address _nftAddress,
        uint256 _tokenID,
        uint8 _rentDuration
    ) external onlyOwner {
        IResolver.PaymentToken[]
            memory paymentTokens = new IResolver.PaymentToken[](1);
        paymentTokens[0] = IResolver.PaymentToken.DAI; // payment token DAI

        IRegistry.NFTStandard[]
            memory NFTstandart = new IRegistry.NFTStandard[](1);
        NFTstandart[0] = IRegistry.NFTStandard.E721; // enum type erc721

        address[] memory nftAddresses = new address[](1);
        nftAddresses[0] = _nftAddress;

        uint256[] memory tokensID = new uint256[](1);
        tokensID[0] = _tokenID;

        uint256[] memory lendAmounts = new uint256[](1);
        lendAmounts[0] = 10000; // lendamount,

        uint8[] memory rentDurations = new uint8[](1);
        rentDurations[0] = _rentDuration; // rent duration uint8,

        bytes4[] memory dailyRentPrices = new bytes4[](1);
        dailyRentPrices[0] = bytes4(0x00000001); // daily rent price,

        IERC721(_nftAddress).approve(address(availableProtocol), _tokenID);
        availableProtocol.lend(
            NFTstandart,
            nftAddresses,
            tokensID,
            lendAmounts,
            rentDurations,
            dailyRentPrices,
            paymentTokens
        );
    }
}
