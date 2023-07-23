// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract DepositSplitContract {
    uint32 public startTime;
    uint32 public endTime;
    uint16 public defaultTime;
    
    uint32 public freezeTime;
    bool public isGameFrozen;
uint16 public defaultFreezeTime;
    uint64 public pot;
    uint64 public totalPlayers;
    address payable public  lastDepositor;
    address payable public owner;
uint256 public depositAmount = 0.00001 ether; 
    struct Winner {
        address winnerAddress;
        uint64 timestamp;
        uint64 amount;
    }

    Winner[] public winners;
 address[] public depositingPlayers;
    mapping(address => uint64) public playerDepositCount;
    mapping(address => uint64) public playerTotalDeposit;

    // Events
    event DepositReceived(address indexed player, uint depositAmount);
    event TimeReset(uint32 newStartTime, uint32 newEndTime);
    event FreezeTimeChanged(uint32 neWTime);
    event DepositSplit(address indexed winner, uint splitAmount, uint ownerAmount);
    event GameFrozen(uint32 freezeEndTime);
    event GameUnfrozen();
    event DepositAttemptedDuringFreeze(address indexed player, uint depositAmount);
    event NoPlayerDeposited();
    event NewGameStarted();

    constructor() {
        defaultTime = 100; 
        defaultFreezeTime = 200;
        owner = payable(msg.sender);

        resetTime();
    }

    function deposit() external payable {
        require(!isGameFrozen, "Game is currently frozen. Deposits are not allowed.");
         require(getRemainingTime() > 0, "Timer has ended");

        require(msg.value == depositAmount, "Deposit amount must be 0.00001 ether");
       
        if (isGameFrozen) {
            emit DepositAttemptedDuringFreeze(msg.sender, msg.value);
            return; // Exit the function if the game is frozen
        }

        endTime += 10;
        lastDepositor = payable(msg.sender);
        playerDepositCount[msg.sender]++;
        playerTotalDeposit[msg.sender] += 0.00001 ether;
        pot += 0.00001 ether;

        if (playerDepositCount[msg.sender] == 1) {
            totalPlayers++;
             depositingPlayers.push(msg.sender); // Add the player to the array when they make their first deposit
        }

        emit DepositReceived(msg.sender, 0.00001 ether);
    }

    function SplitDeposit() public  {
        require(getRemainingTime() == 0, "cannot split");
        if(totalPlayers == 0 ){
emit NoPlayerDeposited();
        freezeGame();
return;
        }
        uint splitAmount = (pot * 95) / 100;
        uint ownerAmount = pot - splitAmount;
        

        winners.push(Winner(lastDepositor, uint64(block.timestamp), uint64(splitAmount)));

        payable(lastDepositor).transfer(splitAmount);
        owner.transfer(ownerAmount);

      
        totalPlayers = 0;
        pot=0;

        
 emit DepositSplit(lastDepositor, splitAmount, ownerAmount);
        // Call the function to freeze the game
        freezeGame();

    }

    function freezeGame() internal {

        isGameFrozen = true;
        freezeTime = uint32(block.timestamp + defaultFreezeTime); // Set the freeze time based on the defaultTime

        emit GameFrozen(freezeTime);
    }

    function unfreezeGame() external onlyOwner {
     
        isGameFrozen = false;
        freezeTime = 0;
          // Reset player data for depositing players
        
        for (uint32 i = 0; i < depositingPlayers.length; i++) {
            address playerAddress = depositingPlayers[i];
            playerDepositCount[playerAddress] = 0;
            playerTotalDeposit[playerAddress] = 0;
        }

        delete depositingPlayers;


        emit GameUnfrozen();
        resetTime();
    }

    function resetDefaultTime(uint16 newTime) external onlyOwner {
                require(!isGameFrozen, "Cannot reset time while the game is frozen.");

        defaultTime = newTime;
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

    function getRemainingFreezeTime() public view returns (uint256) {
        if (!isGameFrozen) {
            return 0;
        }
        if (block.timestamp >= freezeTime) {
            return 0;
        }
        return freezeTime - block.timestamp;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can call this function");
        _;
    }

    // Function to change the defaultTime, callable only by the owner
    function changeDefaultTime(uint16 newTime) external onlyOwner {
        require(isGameFrozen = false, " cannot change in the middle of the game");
        defaultFreezeTime = newTime;
    }

    function getAllWinners() external view returns (Winner[] memory) {
        return winners;
    }

function isGameCurrentlyFrozen() external view returns (bool) {
        return isGameFrozen;
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
   
    // View function to get the freezeTime
    function getFreezeTime() external view returns (uint32) {
        return freezeTime;
    }

    // View function to check if the game is frozen
 

    // View function to get the pot value
    function getPot() external view returns (uint64) {
        return pot;
    }

    // View function to get the total number of players
    function getTotalPlayers() external view returns (uint64) {
        return totalPlayers;
    }

    // View function to get the address of the last depositor
    function getLastDepositor() external view returns (address) {
        return lastDepositor;
    }

    // Function to change the deposit amount, callable only by the owner
    function changeDepositAmount(uint256 newDepositAmount) external onlyOwner {
        require(isGameFrozen = true, "cannot change as the game is going on now" );
        depositAmount = newDepositAmount;
    }

      function getPlayerDepositCount(address playerAddress) external view returns (uint64) {
        return playerDepositCount[playerAddress];
    }

    // Function to get the total deposit of a player
    function getPlayerTotalDeposit(address playerAddress) external view returns (uint64) {
        return playerTotalDeposit[playerAddress];
    }

}
