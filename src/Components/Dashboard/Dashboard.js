import { Card, Spin, Statistic, Row, Col } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const currencies = ["EUR", "USD", "GBP", "AUD", "NZD"];
const Dashboard = ({ updateTitle }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    updateTitle("Dashboard 2");
  });

  useEffect(() => {
    axios
      .get("https://blockchain.info/ticker")
      .then((response) => {
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
