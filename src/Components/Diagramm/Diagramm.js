import { useEffect } from "react";
import axios from "axios";
import { useState } from "react/cjs/react.development";
import { Card } from "antd";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Diagramm = ({ updateTitle }) => {
  const [data, setData] = useState({ datasets: [] });

  useEffect(() => {
    updateTitle("Bitcoin Diagramm");
  });

  useEffect(() => {
    axios
      .get("https://api.blockchain.info/charts/market-price", {
        params: { timespan: "1months", cors: true },
      })
      .then((response) => {
        const labels = response.data.values.map((val) => {
          const date = new Date(val.x * 1000);
          return `${date.getDate()}.${
            date.getMonth() + 1
          }.${date.getFullYear()}`;
        });

        const values = response.data.values.map((val) => val.y);
        setData((s) => ({
          ...s,
          labels: labels,
          datasets: [
            {
              label: "Bicoin Wert in USD im letzten Monat",
              data: values,
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
          ],
        }));
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <Card>
      <Line data={data} />
    </Card>
  );
};

export default Diagramm;
