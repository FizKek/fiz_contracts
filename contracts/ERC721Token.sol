// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract ERC721Token is ERC721, Ownable {
    using Strings for uint256;

    uint256 private counter = 0;
    string internal _baseUri;

    constructor() ERC721("E721", "E721") {}

    function faucet() public {
        counter++;
        _mint(msg.sender, counter);
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        return string(abi.encodePacked(_baseUri, "/", tokenId.toString(), ".png"));

    }

    function setBaseUri(string memory uri) public {
        _baseUri = uri;
    }
}
