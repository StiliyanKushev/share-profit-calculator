import React, { useContext, useState } from "react";
import "semantic-ui-css/semantic.min.css";
import {
  Button,
  Container,
  Form,
  List,
  ListItem,
  Message,
  Segment,
} from "semantic-ui-react";
import { findSolution } from "../../api/stockService";
import { StockContext } from "../../contexts/Stock/provider";

const HomeView: React.FC = () => {
  const {
    state: { results, loading },
    dispatch: stockDispatch,
  } = useContext(StockContext);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [funds, setFunds] = useState("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async () => {
    // Validation for missing dates or funds, and invalid date range
    if (!startDate || !endDate || !funds) {
      setError("Please fill in all fields.");
      return;
    }

    if (new Date(startDate) >= new Date(endDate)) {
      setError("Start date must be before end date.");
      return;
    }

    if (Number(funds) <= 0) {
      setError("Funds must be greater than 0.");
      return;
    }

    stockDispatch({
      type: "stock_loading",
    });

    const newResult = await findSolution({
      startUnixTimestamp: +new Date(startDate),
      endUnixTimestamp: +new Date(endDate),
      funds: Number(funds),
    });

    if (newResult) {
      stockDispatch({
        type: "stock_found",
        payload: newResult,
      });

      // Clear any previous errors
      setError("");
      return;
    } else {
      stockDispatch({
        type: "stock_failed",
      });
    }
  };

  const handleInput =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setter(event.target.value);
    };

  return (
    <Container>
      <Segment>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="Start Date"
              type="date"
              value={startDate}
              onChange={handleInput(setStartDate)}
            />
            <Form.Input
              fluid
              label="End Date"
              type="date"
              value={endDate}
              onChange={handleInput(setEndDate)}
            />
            <Form.Input
              fluid
              label="Available Funds ($)"
              type="number"
              value={funds}
              onChange={handleInput(setFunds)}
              min="1"
            />
          </Form.Group>
          <Button
            loading={loading}
            disabled={loading}
            color="black"
            type="submit"
            onClick={handleSubmit}
          >
            Submit Query
          </Button>
        </Form>

        {error && <Message error>{error}</Message>}

        <List>
          {results.map((result, index) => (
            <ListItem key={index}>
              <Message color={index === 0 ? "green" : "grey"}>
                <Message.Header>Stock Purchase Recommendation</Message.Header>
                <p>
                  Buy Date: {result.buyDate}
                  <br />
                  Buy Price: ${result.buyPrice} per share
                  <br />
                  Sell Date: {result.sellDate}
                  <br />
                  Sell Price: ${result.sellPrice} per share
                  <br />
                  Shares Bought: {result.sharesBought}
                  <br />
                  Total Investment: $
                  {(result.buyPrice * result.sharesBought).toFixed(2)}
                  <br />
                  Total Return: $
                  {(result.sellPrice * result.sharesBought).toFixed(2)}
                  <br />
                  Profit: ${result.profit.toFixed(2)}
                </p>
              </Message>
            </ListItem>
          ))}
        </List>
      </Segment>
    </Container>
  );
};

export default HomeView;
