require("@nomicfoundation/hardhat-toolbox");
//require("@nomicfoundation/hardhat-chai-matchers");
//require('@nomiclabs/hardhat-ethers');
//require("@nomiclabs/hardhat-etherscan");
//require('@openzeppelin/hardhat-upgrades');
require('dotenv').config();

const PRIVATE_KEY = process.env.PRIVATE_KEY; //todo in .env
const SCAN_API_KEY = process.env.SCAN_API_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "hardhat",
  etherscan: {
    apiKey: SCAN_API_KEY
  },
  networks: {
    hardhat: {
    },
    mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/s3Q2tI6l-7xsanmgWuV52EngZbVH5eKZ",
      accounts: [PRIVATE_KEY],
    },
    matic: {
      url: "https://polygon-mainnet.g.alchemy.com/v2/_Y4HiO_dHlUyYVOXqxn2jyvwzytOo7LJ",
      accounts: [PRIVATE_KEY]
    }
  }
};
