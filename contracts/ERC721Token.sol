// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC721Token is ERC721, Ownable {
    uint256 private counter = 0;

    constructor() ERC721("E721", "E721") {}

    function faucet() public {
        counter++;
        _mint(msg.sender, counter);
    }
}
