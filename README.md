## Bifrost Chainlist: 
A resource providing information about Bifrost's blockchain on different testnets, including chain ID, network name, symbol, and explorer URL.
https://chainlist.org/?search=bifrost&testnets=true
## Bifrost Faucet: 
A tool to request test tokens for Bifrost's testnet, allowing developers to experiment and validate applications without using real assets.
https://docs.bifrostnetwork.com/bifrost-network/developer-documentation/testnet-faucet
![image](https://github.com/Block-Developers/Crypto-Coffee/assets/88650559/fb0d7e0f-d4cd-4547-8870-10162437c11d)

# Decentralized Finance (DeFi) Game

Welcome to the Decentralized Finance (DeFi) Game! This game allows users to participate in a decentralized and transparent gaming experience where they can deposit cryptocurrency, extend the timer, and compete for a portion of the pot. Here's a brief overview of the game's features and how it works.

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [How to Play](#how-to-play)
  - [Depositing](#depositing)
  - [Timer and Pot](#timer-and-pot)
  - [Ending the Game](#ending-the-game)
- [Smart Contract](#smart-contract)


## Introduction

The DeFi Game is a decentralized application (DApp) built on blockchain technology that enables users to participate in a time-based competition. Users can deposit cryptocurrency, which extends the game's timer. The last depositor wins a portion of the pot, while a small percentage goes to the game company.

## Getting Started

### Prerequisites

To get started with the DeFi Game, you will need the following:

1. A compatible web browser with a Web3 wallet extension (e.g., MetaMask) installed.
2. BFC cryptocurrency for depositing.

### Installation

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install project dependencies: `npm install --legacy-peer-deps`.
4. run the game: `npm run dev`.

## How to Play

### Depositing

1. Open the DeFi Game DApp in your Web3-enabled browser.
2. Connect your Web3 wallet to the DApp.
3. Choose the amount of cryptocurrency you want to deposit and initiate the transaction.
4. Your deposit will extend the game's timer by 10 seconds.

### Timer and Pot

- The game starts with a set timer (e.g., 60 seconds).
- Each deposit from players increases the timer by 10 seconds.
- The pot represents the total amount of cryptocurrency in the game.

### Ending the Game

- The game ends when the timer reaches zero.
- The last depositor wins 95% of the pot.
- The game company receives 5% of the pot as a fee.
- The pot, total players, and other game statistics are reset for the next round.

### LeaderBoard

- The winners of all the games are displayed in the leaderboard page.

## Smart Contract

The DeFi Game smart contract is responsible for handling deposits, extending the timer, and distributing the pot. The smart contract is written in Solidity and deployed on the Bifrost blockchain.




