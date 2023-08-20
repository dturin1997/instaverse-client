import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import StoryList from "../StoryList";
import StoryForm from "../StoryForm";
import { Layout } from "antd";
import styles from "./styles";
import { getStories } from "../../actions/stories";
import MediaQuery from "react-responsive";

const { Sider, Content } = Layout;

const Home = () => {
  const [selectedId, setSelectedId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStories());
  }, [dispatch]);
  return (
    <>
      <MediaQuery minWidth={768}>
        <Layout>
          <Sider style={styles.sider} width={400}>
            <StoryForm selectedId={selectedId} setSelectedId={setSelectedId} />
          </Sider>
          <Content style={styles.content}>
            <StoryList setSelectedId={setSelectedId} />
          </Content>
        </Layout>
      </MediaQuery>
      <MediaQuery maxWidth={414}>
        <Layout>
          <Content>
            <Sider style={styles.sider} width={390}>
              <StoryForm
                selectedId={selectedId}
                setSelectedId={setSelectedId}
              />
            </Sider>
          </Content>
        </Layout>
        <Layout style={{ ...styles.layout }}>
          <Content style={styles.content}>
            <StoryList setSelectedId={setSelectedId} />
          </Content>
        </Layout>
      </MediaQuery>
    </>
  );
};

export default Home;
