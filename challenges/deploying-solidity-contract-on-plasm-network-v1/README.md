# Deploying Solidity Contract On Plasm Network V1

- Link: https://gitcoin.co/issue/staketechnologies/hello-world-by-polkadot/6/100023960
- Status: Submitted [link](https://raw.githubusercontent.com/Hugoo/polkadot-hackathon/main/challenges/deploying-solidity-contract-on-plasm-network-v1/contractAddress.md) ✅

## Notes

Convert `.sol` contract to substrate using solang:
https://docs.plasmnet.io/workshop-and-tutorial/solidity

```
docker run --rm -it -v /Users/hugoo/deploying-solidity-contract-on-plasm-network-v1/contracts:/sources hyperledgerlabs/solang:v0.1.3 -o /sources /sources/flipper.sol
```

The files generated with [latest docker image](https://hub.docker.com/layers/hyperledgerlabs/solang/latest/images/sha256-1993c7d3f8703f4f60466686d1210a0296626e15f3a1604516ab5053a273a844?context=explore) was not working. The upload of the contract did not work. I had to use v0.1.3

## Results

- Contract address: `0x18d86db0846c2f0a53bd3858e4db2ea6ea9332551feabd14e03765687f542370`
- Deployment instance: `YZQcYXLyyRdmjzfgSattE9RRgBtfyTRkYV6ae69NECKiXd8`
- Owner: `5CobW5xfjXPzUKmeNmJrcSvdj7UkFy11JX9S6zHVRYeHt1Ui`

### Ressources:

- https://apps.plasmnet.io/#/accounts
- https://docs.plasmnet.io/workshop-and-tutorial/solidity
