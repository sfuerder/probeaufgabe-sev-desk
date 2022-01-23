import "./App.css";
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

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

const App = () => {
  const [title, setTitle] = useState("Dashboard");
  const [selectedKey, setSelectedKey] = useState("1");

  const updateTitle = (newTitle) => {
    setTitle(newTitle);
  };

  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible>
          <div className="logo" />
          <Menu theme="dark" selectedKeys={[]} mode="inline">
            <Menu.Item key="/" icon={<DashboardOutlined />}>
              Dashboard
              <Link to="/" />
            </Menu.Item>

            <Menu.Item key="/Detail" icon={<InfoCircleOutlined />}>
              Bitcoin Details
              <Link to="/Detail" />
            </Menu.Item>

            <Menu.Item key="/Calculator" icon={<CalculatorOutlined />}>
              Bitcoin Umrechner
              <Link to="/Calculator" />
            </Menu.Item>

            <Menu.Item key="/Diagramm" icon={<AreaChartOutlined />}>
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
          <Header
            className="site-layout-background header"
            style={{ padding: 0 }}
          >
            <Title className="title">{title}</Title>
          </Header>
          <Content style={{ margin: "24px 16px 0" }}>
            <Routes>
              <Route
                path="/Detail"
                element={<Detail updateTitle={updateTitle} />}
              />
              <Route
                path="/Calculator"
                element={<Calculator updateTitle={updateTitle} />}
              />
              <Route
                path="/Diagramm"
                element={<Diagramm updateTitle={updateTitle} />}
              />
              <Route
                path="/"
                element={<Dashboard updateTitle={updateTitle} />}
              />
            </Routes>
          </Content>
          <Footer style={{ textAlign: "center" }}></Footer>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
