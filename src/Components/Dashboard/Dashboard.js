import { Card, Spin, Statistic, Row, Col } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

const currencies = ["EUR", "USD", "GBP", "AUD", "NZD"];
const Dashboard = () => {
  // const [state, setState] = useState({ isLoading: true, data: {} });
  const [data, setData] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios
      .get("https://blockchain.info/ticker")
      .then((response) => {
        // console.log(response.data);
        // setIsLoading(false);
        // setState((s) => ({ ...s, isLoading: false, data: response.data }));
        // setData(response.data);
        // setIsLoading(false);
        // await sleep(2000);
        setData(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      {data ? (
        <Row gutter={16}>
          {currencies.map((currency, idx) => {
            return (
              <Col key={idx}>
                <Card>
                  {" "}
                  <Statistic title={currency} value={data[currency].last} />
                </Card>
              </Col>
            );
          })}
        </Row>
      ) : (
        <Spin />
      )}
    </>
  );
};

export default Dashboard;
