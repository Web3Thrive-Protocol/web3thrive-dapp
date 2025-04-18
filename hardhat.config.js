require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const providerKey = process.env.ALCHEMY_API_KEY;

const deployerPrivateKey = process.env.DEPLOYER_PRIVATE_KEY;


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {

    localhost: {
      url: "http://127.0.0.1:8545", // local hardhat network
    },
    curtis : {
      url: `https://apechain-curtis.g.alchemy.com/v2/${providerKey}`,
      accounts: [deployerPrivateKey]
    }
  }
};
