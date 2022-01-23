import { Card, Spin, Statistic, Row, Col, Divider, Typography } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const { Title } = Typography;

const currencies = ["EUR", "USD", "GBP", "AUD", "NZD"];
const Dashboard = ({ updateTitle }) => {
  const [data, setData] = useState(null);
  const [bitcoins] = useState(localStorage.getItem("myBitcoins") ?? 0);

  useEffect(() => {
    updateTitle("Dashboard");
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
        <>
          <Row gutter={16}>
            {currencies.map((currency, idx) => {
              return (
                <Col key={idx}>
                  <Card>
                    {" "}
                    <Statistic
                      decimalSeparator=","
                      groupSeparator="."
                      title={currency}
                      value={data[currency].last}
                    />
                  </Card>
                </Col>
              );
            })}
          </Row>
          <Divider />
          <Card>
            <Title level={3}>Meine Bitoins</Title>
            <Row gutter={16}>
              <Col>
                <Statistic
                  decimalSeparator=","
                  groupSeparator="."
                  title="Anzahl Bitcoins"
                  value={bitcoins}
                />
              </Col>
              <Col>
                <Statistic
                  decimalSeparator=","
                  groupSeparator="."
                  title="Wert in EUR"
                  value={bitcoins * data["EUR"].last}
                />
              </Col>
            </Row>
          </Card>
        </>
      ) : (
        <Spin />
      )}
    </>
  );
};

export default Dashboard;
