import React, { useEffect, useState } from 'react';
import { Table, Grid, Button } from 'semantic-ui-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useSubstrate } from './substrate-lib';
import { useErc20Contract, GAS_LIMIT } from './hooks/useErc20Contract';

export default function BalancesErc20(props) {
  const { api, keyring } = useSubstrate();
  const accounts = keyring.getPairs();
  const [balances, setBalances] = useState({});
  const erc20Contract = useErc20Contract();

  useEffect(() => {
    if (!erc20Contract) return;

    const addresses = keyring.getPairs().map((account) => account.address);

    const getBalances = async () => {
      const addressesBalances = await Promise.all(
        addresses.map(async (address) => {
          const contractCall = await erc20Contract.query.balanceOf(
            address,
            0,
            GAS_LIMIT,
            address
          );
          if (contractCall.result.isSuccess) {
            return { address, balance: contractCall.output.toHuman() };
          }
        })
      );
      const balancesMap = addressesBalances
        .filter((address) => {
          return address !== undefined;
        })
        .reduce(
          (acc, address) => ({ ...acc, [address.address]: address.balance }),
          []
        );
      setBalances(balancesMap);
    };

    getBalances();

    // Probably need to properly handle return()
  }, [api, keyring, erc20Contract, setBalances]);

  return (
    <Grid.Column>
      <h1>ERC20 Token Balances</h1>
      <Table celled striped size="small">
        <Table.Body>
          {accounts.map((account) => (
            <Table.Row key={account.address}>
              <Table.Cell width={3} textAlign="right">
                {account.meta.name}
              </Table.Cell>
              <Table.Cell width={10}>
                <span style={{ display: 'inline-block', minWidth: '31em' }}>
                  {account.address}
                </span>
                <CopyToClipboard text={account.address}>
                  <Button
                    basic
                    circular
                    compact
                    size="mini"
                    color="blue"
                    icon="copy outline"
                  />
                </CopyToClipboard>
              </Table.Cell>
              <Table.Cell width={3}>
                {balances &&
                  balances[account.address] &&
                  `${balances[account.address]} token`}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Grid.Column>
  );
}
