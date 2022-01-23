import axios from "axios";
import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { List, Card, Statistic } from "antd";

const requests = [
  { title: "Marktkapitalisierung", path: "marketcap" },
  { title: "Anzahl aller Bitcoins im Umlauf", path: "totalbc" },
  {
    title: "Anzahl der Transaktionen in den letzten 24h",
    path: "24hrtransactioncount",
  },
  {
    title: "Anzahl gesendeter Bitcoin in den letzten 24h",
    path: "24hrbtcsent",
  },
  { title: "Aktuelle Hashrate", path: "hashrate" },
  { title: "Aktueller Schwierigkeitsgrad", path: "getdifficulty" },
];

const Detail = ({ updateTitle }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    updateTitle("Bitcoin Details");
  });

  useEffect(() => {
    axios
      .all(
        requests.map((request) =>
          axios.get(`https://api.blockchain.info/q/${request.path}`)
        )
      )
      .then(
        axios.spread((...responses) => {
          // console.log(responses.map((response) => response.data));
          const newData = requests.map((request, idx) => ({
            title: request.title,
            content: responses[idx].data,
          }));
          // console.log(newData);
          setData(newData);
        })
      );
  }, []);

  return (
    <List
      grid={{ gutter: 16, column: 3 }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <Card>
            <Statistic
              decimalSeparator=","
              groupSeparator="."
              title={item.title}
              value={item.content}
            />
          </Card>
        </List.Item>
      )}
    />
  );
};

export default Detail;
