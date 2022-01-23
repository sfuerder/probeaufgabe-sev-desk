import { Select, Card, InputNumber, Statistic } from "antd";
import { useEffect, useRef } from "react";
import { useState } from "react/cjs/react.development";
import axios from "axios";

const { Option } = Select;
const Calculator = ({ updateTitle }) => {
  const [state, setState] = useState({
    currency: "USD",
    calculatedValue: 0,
  });

  const inputRef = useRef(null);

  const recalculate = () => {
    axios
      .get("https://blockchain.info/tobtc", {
        params: { currency: state.currency, value: inputRef.current.value },
      })
      .then((response) => {
        setState((s) => ({ ...s, calculatedValue: response.data }));
      })
      .catch((err) => {
        console.log("Error");
        setState((s) => ({ ...s, calculatedValue: 0 }));
      });
  };
  useEffect(() => {
    let isCancelled = false;
    updateTitle("Bitcoin Umrechner");
    if (!isCancelled) recalculate();
    return () => (isCancelled = true);
  });

  const currencyChanged = (newCurrency) => {
    setState((s) => ({ ...s, currency: newCurrency }));
    recalculate(inputRef.current.value);
  };

  const valueChanged = () => {
    // setState((s) => ({ ...s, value:  }));
    recalculate();
  };

  const selectAfter = (
    <Select
      defaultValue="USD"
      onChange={currencyChanged}
      style={{ width: 100 }}
    >
      <Option value="USD">USD</Option>
      <Option value="EUR">EUR</Option>
      <Option value="GBP">GBP</Option>
      <Option value="AUD">AUD</Option>
      <Option value="NZD">NZD</Option>
    </Select>
  );

  return (
    <>
      <Card>
        <InputNumber
          ref={inputRef}
          onChange={valueChanged}
          addonAfter={selectAfter}
          defaultValue={1}
          size="large"
        />
      </Card>

      <Card style={{ margin: "10px 0" }}>
        <Statistic title="Bitcoin" value={state.calculatedValue} />
      </Card>
    </>
  );
};

export default Calculator;
