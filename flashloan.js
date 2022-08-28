require("dotenv").config();
const Web3 = require("web3");
const web3 = new Web3(
  "https://polygon-mainnet.g.alchemy.com/v2/75aXOHNFWCXWDtqR2WnTow26dcnZzNeW"
);
const Abi = require("./artifacts/contracts/FlashLoanArbitrage.sol/FlashLoanArbitrage.json");
const abi = Abi.abi;
const CA = "0xAb0A560505B6c14C66FF89A4d4599414856Bd0E1";
const fl = new web3.eth.Contract(abi, CA);
const amount = web3.utils.toWei("10000");
console.log(fl.options.address);
web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY);
web3.eth.getTransactionCount(
  "0xB6e3Ef2f5a6b2a957E9D5Db4cd82e6fC45f3162B",
  (err, res) => {
    if (!err) console.log(res);
  }
);

const main = async () => {
  console.log("Calling flash loan...............");
  const tx = await fl.methods.flashLoanCall(10000).send({
    from: "0xB6e3Ef2f5a6b2a957E9D5Db4cd82e6fC45f3162B",
    to: fl.options.address,
    gas: 22000,
    nonce: await web3.eth.getTransactionCount(
      "0xB6e3Ef2f5a6b2a957E9D5Db4cd82e6fC45f3162B"
    ),
    gasPrice: await web3.eth.getGasPrice(),
  });
  console.log(tx);
};
main();
