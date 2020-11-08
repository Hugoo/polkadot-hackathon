import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Grid,
  Card,
  Statistic,
  Checkbox,
} from "semantic-ui-react";

import { useSubstrate } from "./substrate-lib";
import { TxButton } from "./substrate-lib/components";

function Main(props) {
  const { api } = useSubstrate();
  const { accountPair } = props;

  // The transaction submission status
  const [status, setStatus] = useState("");

  // The currently stored value
  const [currentTestId, setCurrentTestId] = useState(0);
  const [currentTestIsPositive, setCurrentTestIsPositive] = useState(false);
  const [covidTestNumber, setCovidTestNumber] = useState(0);
  const [isPositive, setIsPositive] = useState(false);

  useEffect(() => {
    let unsubscribe;
    api.query.templateModule
      .covidTestResult((testResult) => {
        if (testResult.isNone) {
          setCurrentTestId("<None>");
        } else {
          setCurrentTestId(testResult.Id.toString());
          setCurrentTestIsPositive(testResult.IsPositive.toHuman());
        }
      })
      .then((unsub) => {
        unsubscribe = unsub;
      })
      .catch(console.error);

    return () => unsubscribe && unsubscribe();
  }, [api.query.templateModule]);

  return (
    <Grid.Column width={8}>
      <h1>Covid Test Result</h1>
      <Card centered>
        <Card.Content textAlign="center">
          <Statistic
            label={`Test #${currentTestId} is ${
              currentTestIsPositive ? "positive" : "negative"
            }`}
            value={currentTestIsPositive ? "✅" : "❌"}
          />
        </Card.Content>
      </Card>
      <Form>
        <Form.Field>
          <Input
            label="Test number"
            type="number"
            onChange={(_, { value }) => setCovidTestNumber(value)}
          />
        </Form.Field>
        <Checkbox
          label="Is positive?"
          checked={isPositive}
          onChange={(_, { checked }) => {
            setIsPositive(checked);
          }}
        />
        <Form.Field style={{ textAlign: "center" }}>
          <TxButton
            accountPair={accountPair}
            label="Save covid test result"
            type="SIGNED-TX"
            setStatus={setStatus}
            attrs={{
              palletRpc: "templateModule",
              callable: "insertCovidTestResult",
              inputParams: [
                {
                  Id: parseInt(covidTestNumber, 10),
                  IsPositive: isPositive,
                },
              ],
              paramFields: [true],
            }}
          />
        </Form.Field>
        <div style={{ overflowWrap: "break-word" }}>{status}</div>
      </Form>
    </Grid.Column>
  );
}

export default function TemplateModule(props) {
  const { api } = useSubstrate();
  return api.query.templateModule && api.query.templateModule.something ? (
    <Main {...props} />
  ) : null;
}
