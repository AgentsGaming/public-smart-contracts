// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const keccak256 = require('keccak256');

async function main() {

  //const minter = "0xe453080f8Ba281881A169A62c6fADdaf1ceC4f67";
  //const agentsGamingAddress = "0xa1C6E299c761011c9ca5193b2Aaab7898A23929b";

  const AGFTFactory = await hre.ethers.getContractFactory("AtentFactory");

  
  
  const agftFactory = await AGFTFactory.deploy();
  await agftFactory.deployed();
  console.log(
    `Atent Fan Tokens Factory deployed to ${agftFactory.address}`
  );

  
 // const agentsGamingAddress = "0xa1C6E299c761011c9ca5193b2Aaab7898A23929b";
 // const agentsGaming = AgentsGaming.attach(agentsGamingAddress);  
/*
  const tx1 = await agMarket.grantRole(keccak256("DEFAULT_ADMIN_ROLE"), minter);
  await tx1.wait();

  const tx2 = await agftFactory.grantRole(keccak256("DEPLOYER_ROLE"), agMarket.address);
  await tx2.wait();
*/
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
