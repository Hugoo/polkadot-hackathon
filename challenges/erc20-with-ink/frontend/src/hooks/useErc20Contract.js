import { useState, useEffect } from 'react';
import { Abi, ContractPromise } from '@polkadot/api-contract';

import metadata from '../contracts/erc20/metadata.json';
import { useSubstrate } from '../substrate-lib';

export const GAS_LIMIT = 50000000000; // Arbitrary set to max limit

const CONTRACT_ADDRESS = '5HPjEFcuyWzuqHKRg2Ho7jWJg3KzM4LqBB9EMB6GUPBoDZQr';

export function useErc20Contract() {
  const { api } = useSubstrate();
  const [contract, setContract] = useState();
  const abi = new Abi(metadata);

  useEffect(() => {
    if (!api) {
      return;
    }
    setContract(new ContractPromise(api, abi, CONTRACT_ADDRESS));
  }, [api]);

  return contract;
}
