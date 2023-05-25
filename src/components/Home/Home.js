import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import StoryList from "../StoryList";
import StoryForm from "../StoryForm";
import { Layout, Row, Col, Grid } from "antd";
import styles from "./styles";
import { getStories } from "../../actions/stories";

const { Sider, Content } = Layout;
const { useBreakpoint } = Grid;

const Home = () => {
  const [selectedId, setSelectedId] = useState(null);
  const { xs } = useBreakpoint();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStories());
  }, [dispatch]);
  return (
    <Layout>
      {xs ? (
        <>
          <Content
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Row>
              <Col span={24}>
                <Sider style={styles.sider} width={xs ? "100%" : 400}>
                  <StoryForm
                    selectedId={selectedId}
                    setSelectedId={setSelectedId}
                  />
                </Sider>
              </Col>
            </Row>
            <Row span={24}>
              <Col>
                <Content style={styles.content}>
                  <StoryList setSelectedId={setSelectedId} />
                </Content>
              </Col>
            </Row>
          </Content>
        </>
      ) : (
        <>
          <Sider style={styles.sider} width={400}>
            <StoryForm selectedId={selectedId} setSelectedId={setSelectedId} />
          </Sider>

          <Content style={styles.content}>
            <StoryList setSelectedId={setSelectedId} />
          </Content>
        </>
      )}
    </Layout>
  );
};

export default Home;
