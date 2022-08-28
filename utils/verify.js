const { run } = require("hardhat");

const pool = "0x794a61358D6845594F94dc1DB02A252b5b4814aD";

const args = [pool];
const verify = async (contractAddress) => {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    console.log(e);
  }
};
