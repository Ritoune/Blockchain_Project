// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts@4.7.3/token/ERC20/ERC20.sol";

contract PROJECT is ERC20 {

    constructor() ERC20("PROJECT", "PRO") {
        _mint(msg.sender, 1000 * 10 ** 18);
    }
}