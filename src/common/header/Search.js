import React, { useEffect, useMemo, useState } from "react";
import logo from "./assets/logo.svg";
import { Link } from "react-router-dom";
import { Modal, Input, Row, Checkbox, Button, Text } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  logout,
  register,
} from "../../components/redux/Actions/UserActions";
import { Dropdown, Avatar, Grid } from "@nextui-org/react";
import Autocomplete from "../../components/AutoComplete/Autocomplete";

const Search = () => {
  // fixed Header
  window.addEventListener("scroll", function () {
    const search = document.querySelector(".search");
    search.classList.toggle("active", window.scrollY > 100);
  });
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };
  const [visible2, setVisible2] = React.useState(false);
  const handler2 = () => setVisible2(true);
  const closeHandler2 = () => {
    setVisible2(false);
    console.log("closed");
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [usernameToched, setUsernameToched] = useState(false);
  const [passwordToched, setPasswordToched] = useState(false);
  const [emailToched, setEmailToched] = useState(false);
  // const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const userRegister = useSelector((state) => state.userRegister);
  const productListSuggest = useSelector((state) => state.productListSuggest);
  const { user } = userLogin;
  const { userReg } = userRegister;
  const { products } = productListSuggest;
  const validateEmail = (value) => {
    return value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
  };

  const validateUsername = (value) => {
    return value.match(/^[A-Z0-9._%+-]{2,100}$/i);
  };

  const validatePassword = (value) => {
    return value.match(/^[A-Z0-9._%+-]{8,255}$/i);
  };

  const helperEmail = useMemo(() => {
    if (email === "")
      return {
        text: "Email không được để trống",
      };
    const isValid = validateEmail(email);
    return {
      text: !isValid && "Email không hợp lệ",
    };
  }, [email]);

  const helperUsername = useMemo(() => {
    if (username === "")
      return {
        text: "Tên đăng nhập không được để trống",
      };
    const isValid = validateUsername(username);
    return {
      text: !isValid && "Tên tài khoản ít nhất 2 ký tự trở lên",
    };
  }, [username]);

  const helperPassword = useMemo(() => {
    if (password === "")
      return {
        text: "Mật khẩu không được để trống",
      };
    const isValid = validatePassword(password);
    return {
      text: !isValid && "Mật khẩu ít nhất 8 ký tự trở lên",
    };
  }, [password]);

  useEffect(() => {
    if (user) {
      setVisible(false);
    }
  }, [user]);

  useEffect(() => {
    if (userReg) {
      setVisible2(false);
    }
  }, [userReg]);

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(login(username, password));
  };
  const registerHandler = (e) => {
    e.preventDefault();
    dispatch(register(email, username, password));
  };
  const logoutHander = () => {
    dispatch(logout());
  }


  // const {cartItems} = useSelector((state)=>state.cart)
  const [cartItems, setCartItems] = useState([])
  const [numberCart, setNumberCart] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setCartItems(JSON.parse(localStorage.getItem("cartItems")));
      let totalQuantity = 0;
      cartItems.map((item) =>  totalQuantity += Number(item.qty))
      setNumberCart(totalQuantity) 
    }, 50)
  }, [cartItems]);
 

  return (
    <>
      <section className="search">
        <div className="container c_flex">
          <div className="logo  ">
            <Link to="/">
              <img src="/images/logo.png" alt="" />
            </Link>
          </div>

          <div className="search-box f_flex">
            <Autocomplete suggestions={products?.content?.length > 0 ? products?.content : []} />
            <i  className="fa fa-search"></i>
          </div>

          <div className="icon f_flex width">
            {user ? (
              <Grid.Container justify="flex-end" gap={2}>
                <Grid>
                  <Dropdown placement="bottom-left">
                    <Dropdown.Trigger>
                      <Avatar
                        bordered
                        size="lg"
                        as="button"
                        color="secondary"
                        src={
                          user?.avatarImg?.substring(0).search('https://robohash.org/') === 0
                          || user?.avatarImg?.substring(0).search('https://pet-store-api.azurewebsites.net/') === 0
                            ? user.avatarImg
                            : `${process.env.REACT_APP_API_ENDPOINT}${user.avatarImg}`
                        }
                      />
                    </Dropdown.Trigger>
                    <Dropdown.Menu
                      color="secondary"
                      aria-label="Avatar Actions"
                    >
                      <Dropdown.Item key="profile" css={{ height: "$18" }}>
                        <Text b color="inherit" css={{ d: "flex" }}>
                          Đăng nhập bởi
                        </Text>
                        <Text b color="inherit" css={{ d: "flex" }}>
                          {user.username === undefined
                            ? user?.data?.data.username
                            : user.username}
                        </Text>
                      </Dropdown.Item>
                      <Dropdown.Item key="settings" withDivider>
                        <Link to="/profile">Thông tin cá nhân</Link>
                      </Dropdown.Item>

                      <Dropdown.Item key="logout" color="error" withDivider>
                        <Link to="#" onClick={logoutHander}>
                          Đăng xuất
                        </Link>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Grid>
              </Grid.Container>
            ) : (
              <div className="login-logout">
                <div className="btnlogin">
                  <Button auto light color="error" bordered onClick={handler}>
                    Đăng nhập
                  </Button>
                </div>
                <div className="btnregisted">
                  <Button auto light color="error" bordered onClick={handler2}>
                    Đăng ký
                  </Button>
                </div>
              </div>
            )}

            <Modal
              closeButton
              blur
              aria-labelledby="modal-title"
              open={visible}
              onClose={closeHandler}
            >
              <Modal.Header>
                <Text b id="modal-title" size={18}>
                  Đăng nhập
                </Text>
              </Modal.Header>
              <Modal.Body>
                <Grid.Container gap={3}>
                  <Grid>
                    <Input
                      clearable
                      helperColor="error"
                      helperText={usernameToched && helperUsername.text}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      onFocus={() => setUsernameToched(true)}
                      type="text"
                      bordered
                      fullWidth
                      color="primary"
                      size="lg"
                      placeholder="Username"
                    />
                  </Grid>
                  <Grid>
                    <Input.Password
                      clearable
                      helperColor="error"
                      helperText={passwordToched && helperPassword.text}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setPasswordToched(true)}
                      type="password"
                      bordered
                      fullWidth
                      color="primary"
                      size="lg"
                      placeholder="Password"
                    />
                  </Grid>

                  <Grid>
                    <Row justify="space-between">
                      <Checkbox>
                        <Text size={14}>Remember me</Text>
                      </Checkbox>
                      <Text size={14}>Forgot password?</Text>
                    </Row>
                  </Grid>
                  <Grid>
                    <Row justify="space-between">
                      <Text size={14}>
                        {" "}
                        Bạn chưa có tài khoản?
                        <span
                          onClick={() => {
                            setVisible(false);
                            setVisible2(true);
                          }}
                          style={{
                            cursor: "pointer",
                            color: "#0072F5",
                            fontWeight: "bold",
                          }}
                        >
                          {" "}
                          Đăng ký
                        </span>
                      </Text>
                    </Row>
                  </Grid>
                </Grid.Container>
              </Modal.Body>
              <Modal.Footer>
                <Button auto flat color="error" onClick={closeHandler}>
                  Đóng
                </Button>
                <Button auto onClick={loginHandler}>
                  Đăng nhập
                </Button>
              </Modal.Footer>
            </Modal>
            <Modal
              closeButton
              blur
              aria-labelledby="modal-title"
              open={visible2}
              onClose={closeHandler2}
            >
              <Modal.Header>
                <Text b id="modal-title" size={18}>
                  Đăng ký
                </Text>
              </Modal.Header>
              <Modal.Body>
                <Grid.Container gap={3}>
                  <Grid>
                    <Input
                      clearable
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      helperColor="error"
                      helperText={emailToched && helperEmail.text}
                      onFocus={() => setEmailToched(true)}
                      type="email"
                      bordered
                      fullWidth
                      color="primary"
                      size="lg"
                      placeholder="Email"
                    />
                  </Grid>
                  <Grid>
                    <Input
                      clearable
                      helperColor="error"
                      helperText={usernameToched && helperUsername.text}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      onFocus={() => setUsernameToched(true)}
                      type="text"
                      bordered
                      fullWidth
                      color="primary"
                      size="lg"
                      placeholder="Username"
                    />
                  </Grid>
                  <Grid>
                    <Input.Password
                      clearable
                      helperColor="error"
                      helperText={passwordToched && helperPassword.text}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setPasswordToched(true)}
                      type="password"
                      bordered
                      fullWidth
                      color="primary"
                      size="lg"
                      placeholder="Password"
                    />
                  </Grid>
                  <Grid>
                    <Row justify="space-between">
                      <Text size={14}>
                        {" "}
                        Bạn đã có tài khoản?
                        <span
                          onClick={() => {
                            setVisible(true);
                            setVisible2(false);
                          }}
                          style={{
                            cursor: "pointer",
                            color: "#0072F5",
                            fontWeight: "bold",
                          }}
                        >
                          {" "}
                          Đăng nhập
                        </span>
                      </Text>
                    </Row>
                  </Grid>
                </Grid.Container>
              </Modal.Body>
              <Modal.Footer>
                <Button auto flat color="error" onClick={closeHandler2}>
                  Đóng
                </Button>
                <Button auto onClick={registerHandler}>
                  Đăng ký
                </Button>
              </Modal.Footer>
            </Modal>
            <div className="cart">
              <Link to="/cart">
                <i className="fa fa-shopping-bag icon-circle"></i>
                <span>{numberCart}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Search;
