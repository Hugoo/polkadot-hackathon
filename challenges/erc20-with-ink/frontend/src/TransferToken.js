import React, { useState } from 'react';
import { Form, Input, Grid, Button } from 'semantic-ui-react';

import { useErc20Contract, GAS_LIMIT } from './hooks/useErc20Contract';

const TransferToken = ({ accountPair }) => {
  const [status, setStatus] = useState(null);
  const [formState, setFormState] = useState({ addressTo: null, amount: 0 });
  const erc20Contract = useErc20Contract();

  const onChange = (_, data) =>
    setFormState((prev) => ({ ...prev, [data.state]: data.value }));

  const { addressTo, amount } = formState;

  const sendTransaction = async (event) => {
    if (!erc20Contract) return;

    await erc20Contract.tx
      .transfer(0, GAS_LIMIT, addressTo, parseInt(amount, 10))
      .signAndSend(accountPair, (result) => {
        if (result.status.isInBlock) {
          setStatus('In a block!');
        } else if (result.status.isFinalized) {
          setStatus('Finalized :-)');
        }
      });
    // Would be nice to refresh the balance component after the call
  };

  return (
    <Grid.Column width={8}>
      <h1>Token Transfer</h1>
      <Form>
        <Form.Field>
          <Input
            fluid
            label="To"
            type="text"
            placeholder="address"
            state="addressTo"
            onChange={onChange}
          />
        </Form.Field>
        <Form.Field>
          <Input
            fluid
            label="Amount"
            type="number"
            state="amount"
            onChange={onChange}
          />
        </Form.Field>
        <Form.Field style={{ textAlign: 'center' }}>
          <Button basic color="blue" type="submit" onClick={sendTransaction}>
            Transfer token
          </Button>
        </Form.Field>
        <div style={{ overflowWrap: 'break-word' }}>{status}</div>
      </Form>
    </Grid.Column>
  );
};

export default TransferToken;
