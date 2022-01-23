import { Card, Statistic, Input, InputNumber, Button } from "antd";
import { useRef } from "react";
import { useEffect, useState } from "react/cjs/react.development";

const MyBitcoin = ({ updateTitle }) => {
  const [bitcoins, setBitcoins] = useState(
    localStorage.getItem("myBitcoins") ?? 0
  );

  const inputRef = useRef();

  useEffect(() => {
    updateTitle("Meine Bitcoin");
  });

  useEffect(() => {
    localStorage.setItem("myBitcoins", bitcoins);
  }, [bitcoins]);

  const save = () => {
    setBitcoins(inputRef.current.value);
  };

  return (
    <>
      <Card>
        <Statistic
          decimalSeparator=","
          groupSeparator="."
          title="Meine Bitcoin"
          value={bitcoins}
        />
      </Card>
      <Card>
        <Input.Group compact>
          <InputNumber
            style={{ width: "calc(50% - 200px)" }}
            defaultValue={bitcoins}
            ref={inputRef}
          />
          <Button type="primary" onClick={save}>
            Speichern
          </Button>
        </Input.Group>
      </Card>
    </>
  );
};

export default MyBitcoin;
