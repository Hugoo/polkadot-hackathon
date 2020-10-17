const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const inquirer = require("inquirer");
const { ApiPromise, WsProvider } = require("@polkadot/api");

const CONFIGS = {
  polkadot: { endpoint: "wss://rpc.polkadot.io" },
  kusama: { endpoint: "wss://kusama-rpc.polkadot.io" },
  localhost: { endpoint: "ws://127.0.0.1:9944" },
  custom: { endpoint: "" },
};

clear();

console.log(
  chalk.yellow(figlet.textSync("pkd-cli", { horizontalLayout: "full" }))
);

inquirer
  .prompt([
    {
      name: "network",
      type: "list",
      message: "Select your network",
      choices: Object.keys(CONFIGS).map((key) => {
        return `${key}`;
      }),
    },
    {
      name: "isLatestBlock",
      type: "list",
      message: "Do you want to check latest block or specific block hash?",
      choices: ["latest", "specific"],
    },
  ])
  .then(async (answer) => {
    let endpoint = CONFIGS[answer.network].endpoint;

    if (answer.network === "custom") {
      const answerProvider = await inquirer.prompt([
        {
          name: "wsProvider",
          type: "input",
          message: "What is the custom ws endpoint url? (usually ws://IP:9944)",
        },
      ]);
      endpoint = answerProvider.wsProvider;
    }

    clear();

    console.log(`Fetching data from: ${endpoint}`);

    const provider = new WsProvider(endpoint);
    const api = await ApiPromise.create({ provider });

    const [chain, name, version] = await Promise.all([
      api.rpc.system.chain(),
      api.rpc.system.name(),
      api.rpc.system.version(),
    ]);

    let block;

    if (answer.isLatestBlock === "latest") {
      block = await api.rpc.chain.getBlock();
    } else {
      const answer = await inquirer.prompt([
        {
          name: "blockHash",
          type: "input",
          message: "What is the block hash?",
        },
      ]);

      block = await api.rpc.chain.getBlock(answer.blockHash);
    }

    clear();

    console.log(
      chalk.yellow(figlet.textSync(chain, { horizontalLayout: "full" }))
    );

    console.log(`${chalk.magenta("Node name:")} ${name}`);
    console.log(`${chalk.magenta("Node version:")} ${version}`);
    console.log(
      `${chalk.magenta("Latest block number:")} ${block.block.header.number}`
    );
    console.log(
      `${chalk.magenta("Latest block data:")} ${JSON.stringify(block, null, 2)}`
    );

    process.exit();
  });
