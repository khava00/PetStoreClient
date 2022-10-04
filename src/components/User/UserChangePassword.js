import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { changePassword } from "../redux/Actions/UserActions";

const UserChangePassword = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const changePwd = useSelector((state) => state.changePwd);
  const { userInfo } = userDetails;
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [oldPasswordToched, setOldPasswordToched] = useState(false);
  const [newPasswordToched, setNewPasswordToched] = useState(false);
  const [newPasswordConfirmToched, setNewPasswordConfirmToched] = useState(false);

  //validate
  const validatePassword = (value) => {
    return value?.match(/^[A-Z0-9._%+-]{8,255}$/i);
  };

  const helperOldPassword = useMemo(() => {
    if (!oldPassword && !oldPasswordToched) {
      return {
        text: "",
      };
    }
    if (oldPassword === "" && oldPasswordToched)
      return {
        text: "Mật khẩu cũ không được để trống",
      };
    else {
      const isValid = validatePassword(oldPassword);
      return {
        text: !isValid ? "Mật khẩu phải có ít nhất 8 kí tự" : "",
      };
    }
  }, [oldPassword, oldPasswordToched]);

  const helperNewPassword = useMemo(() => {
    if (!newPassword && !newPasswordToched) {
      return {
        text: "",
      };
    }
    if (newPassword === "" && newPasswordToched)
      return {
        text: "Mật khẩu mới không được để trống",
      };
    else {
      const isValid = validatePassword(newPassword);
      return {
        text: !isValid ? "Mật khẩu phải có ít nhất 8 kí tự" : "",
      };
    }
  }, [newPassword, newPasswordToched]);

  const helperNewPasswordConfirm = useMemo(() => {
    if (!newPasswordConfirm && !newPasswordConfirmToched) {
      return {
        text: "",
      };
    }
    if (newPasswordConfirm === "" && newPasswordConfirmToched)
      return {
        text: "Xác nhận mật khẩu không được để trống",
      };
    else if (newPasswordConfirm !== newPassword) {
      return {
        text: "Mật khẩu mới không khớp",
      };
    } else {
      const isValid = validatePassword(newPasswordConfirm);
      return {
        text: !isValid ? "Mật khẩu phải có ít nhất 8 kí tự" : "",
      };
    }
  }, [newPassword, newPasswordConfirm, newPasswordConfirmToched]);

  const onChangePassword = () => {
    setNewPasswordToched(true);
    setNewPasswordConfirmToched(true);
    setOldPasswordToched(true);

    if (
      helperOldPassword.text === "" &&
      helperNewPassword.text === "" &&
      helperNewPasswordConfirm.text === ""
    ) {
      dispatch(changePassword(userInfo.username, oldPassword, newPassword));
    }
    setOldPassword("")
    setNewPassword("")
    setNewPasswordConfirm("")
    setNewPasswordToched(false);
    setNewPasswordConfirmToched(false);
    setOldPasswordToched(false);

  };

  useEffect(() => {
    if (changePwd.response === "Success!") {
      setOldPassword("");
        setNewPassword("");
        setNewPasswordConfirm("");
      }
  }, [changePwd]);

  return (
    <div className="wrapper">
      <div className="left">
        <div class="content_img">
          <Avatar
            src={userInfo.avatarImg}
            css={{ size: "$40" }}
          />
          <br/>
        </div>
        <h3>{userInfo.username}</h3>
      </div>
      <div className="right">
        <div className="info">
          <h3>Change password</h3>

          <div className="change_password_data">
            <h4>Mật khẩu cũ</h4>
            <Input.Password
              // clearable
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              helperColor="error"
              helperText={oldPasswordToched && helperOldPassword.text}
              onFocus={() => setOldPasswordToched(true)}
              type="text"
              bordered
              fullWidth
              color="primary"
              size="md"
              placeholder="Mật khẩu cũ"
            />
          </div>
          <br />
          <div className="change_password_data">
            <h4>Mật khẩu mới</h4>
            <Input.Password
              // clearable
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              helperColor="error"
              helperText={newPasswordToched && helperNewPassword.text}
              onFocus={() => setNewPasswordToched(true)}
              type="text"
              bordered
              fullWidth
              color="primary"
              size="md"
              placeholder="Mật khẩu mới"
            />
          </div>
          <br />
          <div className="change_password_data">
            <h4>Xác nhận mật khẩu mới</h4>
            <Input.Password
              // clearable
              value={newPasswordConfirm}
              onChange={(e) => setNewPasswordConfirm(e.target.value)}
              helperColor="error"
              helperText={
                newPasswordConfirmToched && helperNewPasswordConfirm.text
              }
              onFocus={() => setNewPasswordConfirmToched(true)}
              type="text"
              bordered
              fullWidth
              color="primary"
              size="md"
              placeholder="Xác nhận mật khẩu mới"
            />
          </div>
        </div>
        <div className="social_media">
          <button onClick={onChangePassword} className="btn-save-detail">
            Đổi mật khẩu
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserChangePassword;
