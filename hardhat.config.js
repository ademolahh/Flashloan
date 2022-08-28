require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-deploy");
require("solidity-coverage");
require("hardhat-gas-reporter");
require("hardhat-contract-sizer");
require("dotenv").config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const POLYGON_RPC_URL = process.env.POLYGON_RPC_URL || "";
const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL || "";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const REPORT_GAS = process.env.REPORT_GAS || true;

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    localhost: {
      chainId: 31337,
    },
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      saveDeployments: true,
      chainId: 5,
      blockConfirmations: 6,
    },
    polygon: {
      url: POLYGON_RPC_URL,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      saveDeployments: true,
      chainId: 137,
      blockConfirmations: 6,
    },
  },

  gasReporter: {
    enabled: REPORT_GAS,
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
    // coinmarketcap: process.env.COINMARKETCAP_API_KEY,
  },
  contractSizer: {
    runOnCompile: true,
    // only: ["E.sol"],
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
      1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
    },
    feeCollector: {
      default: 1,
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.10",
      },
    ],
  },
  etherscan: {
    apiKey: { polygon: ETHERSCAN_API_KEY },
    customChains: [
      {
        network: "polygon",
        chainId: 137,
        urls: {
          apiURL: "https://api.polygonscan.com",
          browserURL: "https://polygonscan.com",
        },
      },
    ],
  },
  mocha: {
    timeout: 200000, // 200 seconds max for running tests
  },
};
