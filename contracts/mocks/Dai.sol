pragma solidity ^0.6.3;

import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/docs-v3.x/contracts/token/ERC20/ERC20.sol';


contract Dai is ERC20 {
    constructor() ERC20('DAI', 'Dai Stablecoin') public {}
    function faucet(address to, uint amount) external {
    _mint(to, amount);
  }
}