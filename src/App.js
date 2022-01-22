import "./App.css";
// import Navigation from "./Components/Navigation/Navigation";
import { Layout, Menu, Typography } from "antd";
import {
  UserOutlined,
  DashboardOutlined,
  InfoCircleOutlined,
  CalculatorOutlined,
  AreaChartOutlined,
} from "@ant-design/icons";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import Detail from "./Components/Detail/Detail";
import Calculator from "./Components/Calculator/Calculator";
import Diagramm from "./Components/Diagramm/Diagramm";
import { useState } from "react/cjs/react.development";

// import "./Navigation.css";

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

const App = () => {
  const [title, setTitle] = useState("Dashboard");
  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1" icon={<DashboardOutlined />}>
              Dashboard
              <Link to="/" />
            </Menu.Item>

            <Menu.Item key="2" icon={<InfoCircleOutlined />}>
              Bitcoin Details
              <Link to="/Detail" />
            </Menu.Item>

            <Menu.Item key="3" icon={<CalculatorOutlined />}>
              Bitcoin Umrechner
              <Link to="/Calculator" />
            </Menu.Item>

            <Menu.Item key="4" icon={<AreaChartOutlined />}>
              Bitcoin Diagramm
              <Link to="/Diagramm" />
            </Menu.Item>

            <Menu.Item key="5" icon={<UserOutlined />}>
              Meine Bitcoin
              <Link to="/Detail" />
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {/* <Title>{title}</Title> */}
          </Header>
          <Content style={{ margin: "24px 16px 0" }}>
            <Routes>
              {/* <Route path="/Dashboard" element={<Slider variant="werbeTV" />} />
              <Route
                path="/Pressekonferenz"
                element={<Slider variant="pressekonferenz" />}
              /> */}
              <Route path="/Detail" element={<Detail />} />
              <Route path="/Calculator" element={<Calculator />} />
              <Route path="/Diagramm" element={<Diagramm />} />
              <Route path="/" element={<Dashboard />} />
            </Routes>
          </Content>
          <Footer style={{ textAlign: "center" }}></Footer>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
