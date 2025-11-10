import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Layout, Image, Typography, Button, Avatar} from "antd";
import Logo from "../../images/icono-instagram.png";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../constants/actionTypes";
import decode from "jwt-decode";

import styles from "./styles";
import MediaQuery from "react-responsive";

const { Title } = Typography;
const { Header } = Layout;

export default function AppBar() {
  //const user = null;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

    const logout = useCallback(() => {
    dispatch({ type: LOGOUT });
    navigate("/authform"); // redirect to login page
    setUser(null);
  }, [dispatch, navigate, setUser]);

  useEffect(() => {
    // Load user from localStorage
    const storedProfile = JSON.parse(localStorage.getItem("profile"));
    setUser(storedProfile);

    // Check if token expired
    const token = storedProfile?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }
  }, [location, logout, setUser]); // dependencies are stable

  return (
    <>
      <MediaQuery minWidth={768}>
        <Header style={styles.header}>
          <Link to="/">
            <div style={styles.homeLink}>
              <Image
                style={styles.image}
                width="45"
                preview={false}
                src={Logo}
              />
              &nbsp;
              <Title style={styles.title}>Instaverse</Title>
            </div>
          </Link>
          {!user ? (
            <Link to="/authform">
              <Button htmlType="button" style={styles.login}>
                Log In
              </Button>
            </Link>
          ) : (
            <div style={styles.userInfo}>
              <Avatar style={styles.avatar} alt="username" size="large">
                {user?.result?.username?.charAt(0)?.toUpperCase()}
              </Avatar>
              <Title style={styles.title} level={4}>
                {user?.result?.username}
              </Title>
              <Button onClick={logout} htmlType="button">
                Log Out
              </Button>
            </div>
          )}
        </Header>
      </MediaQuery>
      <MediaQuery maxWidth={430}>
        <Header
          style={{
            ...styles.header,
            ...{ flexDirection: "column", height: "110px" },
          }}
        >
          <Link to="/">
            <div style={styles.homeLink}>
              <Image
                style={styles.image}
                width="45"
                preview={false}
                src={Logo}
              />
              &nbsp;
              <Title style={styles.title}>Instaverse</Title>
            </div>
          </Link>
          {!user ? (
            <Link
              to="/authform"
              style={{ display: "flex", alignItems: "start" }}
            >
              <Button htmlType="button">Log In</Button>
            </Link>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                marginTop: "5px",
                marginBottom: "5px",
              }}
            >
              <Avatar style={styles.avatar} alt="username" size="large">
                {user?.result?.username?.charAt(0)?.toUpperCase()}
              </Avatar>
              <Title style={{ ...styles.title, marginRight: "5px" }} level={4}>
                {user?.result?.username}
              </Title>
              <Button onClick={logout} htmlType="button">
                Log Out
              </Button>
            </div>
          )}
        </Header>
      </MediaQuery>
    </>
  );
}
