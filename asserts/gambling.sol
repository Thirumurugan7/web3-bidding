// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract DepositSplitContract {
    uint32 public startTime;
    uint32 public endTime;
    uint32 public defaultTime;
    uint256 public pot;
    uint256 public totalPlayers;
    address payable public lastDepositor;
    address payable public owner;
    uint256 public depositAmount;

    struct Winner {
        address winnerAddress;
        uint256 timestamp;
        uint256 amount;
    }

    Winner[] public winners;
    address[] public depositingPlayers;
    mapping(address => uint256) public playerDepositCount;
    mapping(address => uint256) public playerTotalDeposit;
    mapping(address => bool) public owners;

    // Events
    event DepositReceived(address indexed player, uint depositAmount);
    event TimeReset(uint32 newStartTime, uint32 newEndTime);
    event DepositSplit(
        address indexed winner,
        uint splitAmount,
        uint ownerAmount
    );
    event NoPlayerDeposited();
    event NewGameStarted();
    event NewOwnerAdded(address newOwner);

    event n1();
    event n2();
    event n3();

    constructor() {
        defaultTime = 600;
        owner = payable(msg.sender);
        owners[msg.sender] = true; // The deployer of the contract is also an owner
        depositAmount = 10 ether;
        resetTime();
    }

    function deposit() external payable {
        require(getRemainingTime() > 0, "Timer has ended");
        emit n1();
        require(
            msg.value == depositAmount,
            "Deposit amount must be 0.00001 ether"
        );
        emit n2();
        endTime += 10;
        lastDepositor = payable(msg.sender);
        playerDepositCount[msg.sender]++;
        playerTotalDeposit[msg.sender] += 10 ether;
        emit n3();
        pot += uint256(msg.value);

        if (playerDepositCount[msg.sender] == 1) {
            totalPlayers++;
            depositingPlayers.push(msg.sender); // Add the player to the array when they make their first deposit
        }

        emit DepositReceived(msg.sender, 10 ether);
    }

    function SplitDeposit() public {
        require(getRemainingTime() == 0, "cannot split");
        if (totalPlayers == 0) {
            emit NoPlayerDeposited();
            resetTime();
            return;
        }

        uint splitAmount = (pot * 95) / 100;
        uint ownerAmount = pot - splitAmount;

        winners.push(
            Winner(
                lastDepositor,
                uint256(block.timestamp),
                uint256(splitAmount)
            )
        );

        payable(lastDepositor).transfer(splitAmount);
        owner.transfer(ownerAmount);

        totalPlayers = 0;
        pot = 0;
        resetTime();
        for (uint32 i = 0; i < depositingPlayers.length; i++) {
            address playerAddress = depositingPlayers[i];
            playerDepositCount[playerAddress] = 0;
            playerTotalDeposit[playerAddress] = 0;
        }

        delete depositingPlayers;

        emit DepositSplit(lastDepositor, splitAmount, ownerAmount);
    }

    function resetTime() internal {
        startTime = uint32(block.timestamp);
        endTime = startTime + defaultTime;

        emit TimeReset(startTime, endTime);
    }

    function getRemainingTime() public view returns (uint256) {
        if (block.timestamp >= endTime) {
            return 0;
        }
        return endTime - block.timestamp;
    }

    modifier onlyOwner() {
        require(
            owners[msg.sender],
            "Only the contract owner can call this function"
        );
        _;
    }

    // Function to change the defaultTime, callable only by the owner
    function resetDefaultTime(uint32 newTime) external onlyOwner {
        defaultTime = newTime;
    }

    // Function to add a new owner, callable only by the current owner
    function addOwner(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Invalid address");
        owners[newOwner] = true;
        emit NewOwnerAdded(newOwner);
    }

    // View function to get the startTime
    function getStartTime() external view returns (uint32) {
        return startTime;
    }

    // View function to get the endTime
    function getEndTime() external view returns (uint32) {
        return endTime;
    }

    // View function to get the defaultTime
    function getDefaultTime() external view returns (uint32) {
        return defaultTime;
    }

    // View function to get the pot value
    function getPot() external view returns (uint256) {
        return pot;
    }

    // View function to get the total number of players
    function getTotalPlayers() external view returns (uint256) {
        return totalPlayers;
    }

    // View function to get the address of the last depositor
    function getLastDepositor() external view returns (address) {
        return lastDepositor;
    }

    function getDeposit() external view returns (uint256) {
        return depositAmount;
    }

    // Function to change the deposit amount, callable only by the owner
    function changeDepositAmount(uint256 newDepositAmount) external onlyOwner {
        depositAmount = newDepositAmount;
    }

    function getPlayerDepositCount(
        address playerAddress
    ) external view returns (uint256) {
        return playerDepositCount[playerAddress];
    }

    // Function to get the total deposit of a player
    function getPlayerTotalDeposit(
        address playerAddress
    ) external view returns (uint256) {
        return playerTotalDeposit[playerAddress];
    }

    function getDepositors() external view returns (address[] memory) {
        return depositingPlayers;
    }
}
