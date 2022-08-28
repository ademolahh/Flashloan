//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {IPool} from "@aave/core-v3/contracts/interfaces/IPool.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract FlashLoanReceiver is Ownable {
    IPool public immutable pool;

    constructor(address _pool) {
        pool = IPool(_pool);
    }

    function flashLoanCall(address token, uint256 _amount) external onlyOwner {
        address receiver = address(this);
        bytes memory params = "";
        uint16 referralCode = 0;
        pool.flashLoanSimple(receiver, token, _amount, params, referralCode);
    }

    function executeOperation(
        address asset,
        uint256 amount,
        uint256 premium,
        address, //initiator,
        bytes calldata //params
    ) external returns (bool) {
        // arbitrage, liq
        uint256 totalAmount = amount + premium;
        IERC20(asset).approve(address(pool), totalAmount);
        return true;
    }

    function withdrawToken(address _token) external onlyOwner {
        uint256 bal = IERC20(_token).balanceOf(address(this));
        IERC20(_token).transfer(msg.sender, bal);
    }
}
