import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Layout, Image, Typography, Button, Avatar, Grid } from "antd";
import Logo from "../../images/icono-instagram.png";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../constants/actionTypes";
import decode from "jwt-decode";

import styles from "./styles";

const { Title } = Typography;
const { Header } = Layout;
const { useBreakpoint } = Grid;

export default function AppBar() {
  const { xs } = useBreakpoint();
  //const user = null;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const logout = () => {
    dispatch({ type: LOGOUT });
    navigate("/authform"); // redirect to login page
    setUser(null);
  };

  return (
    <>
      {xs ? (
        <Header style={{ ...styles.header, height: "8rem" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>
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
            </div>
            <div>
              {!user ? (
                <Link to="/authform">
                  <Button htmlType="button" style={styles.login}>
                    Log In
                  </Button>
                </Link>
              ) : (
                <div
                  style={{
                    position: "relative",
                    marginTop: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Avatar style={styles.avatar} alt="username" size="large">
                    {user?.result?.username?.charAt(0)?.toUpperCase()}
                  </Avatar>
                  <Title style={styles.title} level={4}>
                    {user?.result?.username}
                  </Title>
                  <Button
                    style={{ marginLeft: "10px" }}
                    onClick={logout}
                    htmlType="button"
                  >
                    Log Out
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Header>
      ) : (
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
      )}
    </>
  );
}
