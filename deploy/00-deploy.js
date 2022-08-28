const { ethers, run } = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { log, deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const pool = "0x794a61358D6845594F94dc1DB02A252b5b4814aD";

  const args = [pool];
  console.log("Preparing to deploy...........................");
  await deploy("FlashLoanReceiver", {
    from: deployer,
    log: true,
    args,
  });
  log("Deployed sucessfuly!!!!!!!!!!");
};

module.exports.tags = ["all", "flash"];
