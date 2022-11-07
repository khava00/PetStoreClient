import React, { useEffect, useState, useMemo } from 'react'
import "./PetDetails.css"
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Input, Row, Checkbox, Button, Grid, Text } from "@nextui-org/react";
import { login } from '../redux/Actions/UserActions';
const LoginReview = () => {
    const dispatch= useDispatch()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameToched, setUsernameToched] = useState(false);
    const [passwordToched, setPasswordToched] = useState(false);
    const [visible, setVisible] = useState(false);
    const userLogin = useSelector((state) => state.userLogin);
    const { user } = userLogin
    const closeHandler = () => {
        setVisible(false);
        console.log("closed");
    };
    const loginHandler = (e) => {
        dispatch(login(username, password));
    };
    useEffect(() => {
        if (user) {
            setVisible(false);
        }
    }, [user]);

    const validateUsername = (value) => {
        return value.match(/^[A-Z0-9._%+-]{2,100}$/i);
    };

    const validatePassword = (value) => {
        return value.match(/^[A-Z0-9._%+-]{8,255}$/i);
    };

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

    return (
        <>
            <p>Vui lòng <Text style={{ color: "blue", cursor: "pointer" }} onClick={(e) => setVisible(true)}>Đăng nhập</Text> để được đánh giá</p>
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

                    </Grid.Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button auto flat color="error" onClick={closeHandler}>
                        Đóng
                    </Button>
                    <Button auto onClick={(e) => loginHandler(e)}>
                        Đăng nhập
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default LoginReview