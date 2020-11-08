const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const inquirer = require("inquirer");
const { ApiPromise, Keyring, WsProvider } = require("@polkadot/api");
const { waitReady } = require("@polkadot/wasm-crypto");

async function main() {
  const provider = new WsProvider("ws://127.0.0.1:9944");
  const api = await ApiPromise.create({ provider });
  await waitReady();

  const keyring = new Keyring({ type: "sr25519" });
  const ACCOUNTS_MAP = {
    alice: keyring.addFromUri("//Alice"),
    bob: keyring.addFromUri("//Bob"),
    charlie: keyring.addFromUri("//Charlie"),
    dave: keyring.addFromUri("//Dave"),
    eve: keyring.addFromUri("//Eve"),
    ferdie: keyring.addFromUri("//Ferdie"),
  };

  clear();

  console.log(
    chalk.yellow(figlet.textSync("multisig", { horizontalLayout: "full" }))
  );

  const answerFrom = await inquirer.prompt([
    {
      name: "from",
      type: "list",
      message: "Who will sign the transaction?",
      choices: Object.keys(ACCOUNTS_MAP).map((key) => {
        return `${key}`;
      }),
    },
  ]);

  clear();
  const from = ACCOUNTS_MAP[answerFrom.from];

  const signatories = (
    await inquirer.prompt([
      {
        name: "signatories",
        type: "checkbox",
        message: "Other signatories",
        choices: Object.keys(ACCOUNTS_MAP)
          .filter((key) => key !== answerFrom.from)
          .map((key) => {
            return `${key}`;
          }),
      },
    ])
  ).signatories.map((signatorie) => ACCOUNTS_MAP[signatorie].address);

  clear();

  const threshold = (
    await inquirer.prompt([
      {
        name: "threshold",
        type: "number",
        message: `Threshold (min: 0, max: ${signatories.length + 1}):`,
      },
    ])
  ).threshold;

  const remark = (
    await inquirer.prompt([
      {
        name: "remark",
        type: "text",
      },
    ])
  ).remark;

  const callHash = api.tx.system.remark(remark).toHex();
  const unsub = await api.tx.multisig
    .approveAsMulti(threshold, signatories, null, callHash, 0)
    .signAndSend(from, ({ status }) => {
      console.info("Transaction status: " + status.type);
      if (status.isFinalized) {
        console.info("Block Hash: " + status.asFinalized.toString());
        process.exit(0);
      }
    })
    .catch(console.error);
  return unsub;
}

main();
