// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract DepositSplitContract {


    uint32 public startTime; // Timestamp representing the start time of the current game.
    uint32 public endTime; // Timestamp representing the end time of the current game.
    uint32 public defaultTime; // Default time period in seconds for each game.
    uint256 public pot; // Accumulated Ether amount in the contract to be split among the winners and the owner.
    uint256 public totalPlayers; // The total number of players who have made at least one deposit in the current game.
    address payable public lastDepositor; // Address of the last player who made a deposit.
    address payable public owner; // Address of the contract owner.
    uint256 public depositAmount; // The amount of Ether required for each deposit.

    struct Winner {
        address winnerAddress; // Address of the winner.
        uint256 timestamp; // Timestamp when the winner won.
        uint256 amount; // Amount of Ether won by the player.
    }


    Winner[] public winners;  // Array containing information about all past winners.

    
    address[] public depositingPlayers;  // Array containing addresses of players who have made at least one deposit in the current game
    mapping(address => uint256) public playerDepositCount; // Mapping to store the count of deposits made by each player in the current game.
    mapping(address => uint256) public playerTotalDeposit;  // Mapping to store the total deposit amount made by each player.
    mapping(address => bool) public owners; // Mapping to store whether an address is an owner or not.

    // Events
    event DepositReceived(address indexed player, uint depositAmount);  // Event emitted when a player makes a deposit.
    event TimeReset(uint32 newStartTime, uint32 newEndTime);  // Event emitted when the game's start and end times are reset.
    event DepositSplit(
        address indexed winner,
        uint splitAmount,
        uint ownerAmount
    );  // Event emitted when the deposit is split among the winner and the owner.
    event NoPlayerDeposited();  // Event emitted when the split is attempted, but no players have deposited in the current game.
    event NewGameStarted();  // Event emitted when a new game starts.
    event NewOwnerAdded(address newOwner);  // Event emitted when a new owner is added to the contract.

       constructor() {
        defaultTime = 50; // Initialize the default time to 50 seconds for each game.
        owner = payable(msg.sender); // Set the contract deployer's address as the initial owner.
        owners[msg.sender] = true; // Mark the deployer of the contract as an owner.
        depositAmount = 10 ether; // Set the initial deposit amount to 10 Ether.
        resetTime(); // Call the internal function to initialize the game start and end times.
    }

    function deposit() external payable {
        require(getRemainingTime() > 0, "Timer has ended");  // Check if there is remaining time in the current game.
         // Check if the deposited amount matches the required depositAmount.
        require(
            msg.value == depositAmount,
            "Deposit amount must be 0.00001 ether"
        );
       
        endTime += 10; // Extend the end time of the current game by 10 seconds.
        lastDepositor = payable(msg.sender);  // Set the last depositor's address.
        playerDepositCount[msg.sender]++; // Increment the deposit count for the player.
        playerTotalDeposit[msg.sender] += depositAmount;  // Update the total deposit amount for the player.
       
        pot += uint256(msg.value); // Add the deposited Ether to the pot.

        if (playerDepositCount[msg.sender] == 1) {
            totalPlayers++;  // If it's the player's first deposit, increase the totalPlayers count.
            depositingPlayers.push(msg.sender); // Add the player to the array when they make their first deposit
        }

        emit DepositReceived(msg.sender, 10 ether);
    }

       function SplitDeposit() public {
        require(getRemainingTime() == 0, "cannot split"); // Check if the game has ended.
        if (totalPlayers == 0) {
            emit NoPlayerDeposited(); // If no players have deposited, emit the NoPlayerDeposited event.
            resetTime(); // Reset the game start and end times.
            return;
        }

        uint splitAmount = (pot * 95) / 100; // Calculate 95% of the pot as the splitAmount.
        uint ownerAmount = pot - splitAmount; // Calculate the remaining amount for the owner.

        winners.push(
            Winner(
                lastDepositor,
                uint256(block.timestamp),
                uint256(splitAmount)
            )
        ); // Add the winner's information to the winners array.

        payable(lastDepositor).transfer(splitAmount); // Transfer the splitAmount to the winner.
        owner.transfer(ownerAmount); // Transfer the remaining amount to the contract owner.

        totalPlayers = 0; // Reset the totalPlayers count.
        pot = 0; // Reset the pot amount.
        resetTime(); // Reset the game start and end times.
        lastDepositor = payable(address(0)); // Reset the lastDepositor address.

        // Reset deposit counts and total deposit amounts for all players.
        for (uint32 i = 0; i < depositingPlayers.length; i++) {
            address playerAddress = depositingPlayers[i];
            playerDepositCount[playerAddress] = 0;
            playerTotalDeposit[playerAddress] = 0;
        }

        delete depositingPlayers; // Clear the depositingPlayers array.

        emit DepositSplit(lastDepositor, splitAmount, ownerAmount); // Emit the DepositSplit event with the winner's address, splitAmount, and ownerAmount.
    }

 function resetTime() internal {
        startTime = uint32(block.timestamp); // Set the current block timestamp as the startTime.
        endTime = startTime + defaultTime; // Calculate the endTime based on the defaultTime.

        emit TimeReset(startTime, endTime); // Emit the TimeReset event with the new startTime and endTime.
    }

    function getRemainingTime() public view returns (uint256) {
        if (block.timestamp >= endTime) {
            return 0; // If the current block timestamp is greater than or equal to the endTime, return 0 (game ended).
        }
        return endTime - block.timestamp; // Otherwise, return the remaining time in seconds.
    }

    modifier onlyOwner() {
        require(owners[msg.sender], "Only the contract owner can call this function"); // Modifier to restrict certain functions to be callable only by the contract owner.
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
 // View function to get the deposit amount 
    function getDeposit() external view returns (uint256) {
        return depositAmount;
    }

    // Function to change the deposit amount, callable only by the owner
    function changeDepositAmount(uint256 newDepositAmount) external onlyOwner {
        depositAmount = newDepositAmount;
    }
 //  view function to get the deposit count of the  depositor
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
 // View function to get all the depositors of the game
    function getDepositors() external view returns (address[] memory) {
        return depositingPlayers;
    }

    // view function to get all the winners if the game throughout the history
    function getWinners() external view returns (Winner[] memory) {
    return winners;
}
}
