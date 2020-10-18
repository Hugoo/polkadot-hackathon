pragma solidity ^0.6.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v3.1.0/contracts/token/ERC20/ERC20.sol";

// This ERC-20 contract mints the specified amount of tokens to the contract creator.
contract CrepeToken is ERC20 {
    constructor(uint256 initialSupply) public ERC20("CrepeToken", "CRPE") {
        _mint(msg.sender, initialSupply);
    }
}
