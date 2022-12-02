// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  
  //const lockedAmount = hre.ethers.utils.parseEther("1");

  const AgentsGaming = await hre.ethers.getContractFactory("AgentsGaming");
  /*
  const agentsGaming = await AgentsGaming.deploy();
  await agentsGaming.deployed();
  console.log(
    `Agents Gaming deployed to ${agentsGaming.address}`
  );
  */

  const minter = ""; //TODO
  const agentsGamingAddress = "0xa1C6E299c761011c9ca5193b2Aaab7898A23929b";
  const agentsGaming = AgentsGaming.attach(agentsGamingAddress);  

  const tx1 = await agentsGaming.grantRole(keccak256("MINTER_ROLE"), minter);
  await tx1.wait();

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
