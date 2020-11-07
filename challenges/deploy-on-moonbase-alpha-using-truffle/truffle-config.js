const PrivateKeyProvider = require("./private-provider");
const { ALPHA_PRIVATE_KEY, GENESIS_PRIVATE_KEY } = require("./secrets");

module.exports = {
  networks: {
    development: {
      provider: () =>
        new PrivateKeyProvider(
          GENESIS_PRIVATE_KEY,
          "http://localhost:9933/",
          43
        ),
      network_id: 43,
    },
    alpha: {
      networkCheckTimeout: 300000,
      provider: () =>
        new PrivateKeyProvider(
          ALPHA_PRIVATE_KEY,
          "https://rpc.testnet.moonbeam.network/",
          43
        ),
      network_id: 43,
    },
    // live: {
    //   provider: () => new PrivateKeyProvider(privateKey, "http://35.203.125.209:9933/", 43),
    //   network_id: 43
    // },
    // ganache: {
    //   provider: () => new PrivateKeyProvider(privateKey, "http://localhost:8545/", 43),
    //   network_id: 43
    // }
  },
};
