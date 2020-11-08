import React, { useState } from "react";
import { Form, Input, Grid } from "semantic-ui-react";
import { useSubstrate } from "./substrate-lib";
import { TxButton } from "./substrate-lib/components";

const MultiSig = ({ accountPair }) => {
  const { api } = useSubstrate();
  const [status, setStatus] = useState(null);
  const [threshold, setThreshold] = useState(0);
  const [amount, setAmount] = useState(0);

  const [formState, setFormState] = useState({
    signatories: "",
    addressTo: "",
  });

  const onChange = (_, data) =>
    setFormState((prev) => ({ ...prev, [data.state]: data.value }));

  const { signatories, addressTo } = formState;

  return (
    <Grid.Column>
      <h1>Multi signature (transfert) 📝📝</h1>
      <Form>
        <Form.Field>
          <Input
            fluid
            label="Threshold"
            type="number"
            placeholder="threshold"
            state="threshold"
            onChange={(_, data) => {
              if (data.value >= 0) {
                setThreshold(data.value);
              } else {
                setThreshold(0);
              }
            }}
          />
        </Form.Field>
        <Form.Field>
          <Input
            fluid
            label="Other Signatories"
            placeholder="Acc1, Acc2, Acc3..."
            type="text"
            state="signatories"
            onChange={onChange}
          />
        </Form.Field>
        <Form.Field>
          <Input
            fluid
            label="To"
            type="text"
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
            onChange={(_, data) => {
              if (data.value >= 0) {
                setAmount(data.value);
              } else {
                setAmount(0);
              }
            }}
          />
        </Form.Field>
        <Form.Field style={{ textAlign: "center" }}>
          <TxButton
            accountPair={accountPair}
            label="Submit"
            type="SIGNED-TX"
            setStatus={setStatus}
            attrs={{
              palletRpc: "multisig",
              callable: "asMulti",
              inputParams: [
                threshold,
                signatories.split(","),
                null,
                api.tx.balances.transfer(addressTo, amount),
                false,
                10000000,
              ],
              paramFields: [true, true, { optional: true }, true, true, true],
            }}
          />
        </Form.Field>
        <div style={{ overflowWrap: "break-word" }}>{status}</div>
      </Form>
    </Grid.Column>
  );
};

export default MultiSig;
