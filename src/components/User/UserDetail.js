import { Avatar, Input } from "@nextui-org/react";
import React, { useEffect, useMemo, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { updateProfileImage } from "../redux/Actions/UserActions";
import "./style.css";
import { updateProfileUser } from "./../redux/Actions/UserActions";
import { BsPencilSquare } from "react-icons/bs";
import { AiOutlineCloseSquare } from "react-icons/ai";

const UserDetail = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { userInfo } = userDetails;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [emailToched, setEmailToched] = useState(false);
  const [firstNameToched, setFirstNameToched] = useState(false);
  const [lastNameToched, setLastNameToched] = useState(false);
  const [phoneToched, setPhoneToched] = useState(false);
  const [imageFile, setImageFile] = useState();
  const [activeEdit, setActiveEdit] = useState(false);
  useEffect(() => {
    if (userInfo) {
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setEmail(userInfo.email);
      setPhone(userInfo.phone);
    }
  }, [dispatch, userInfo]);

  const onProfileImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const onChangeProfileImage = () => {
    document.getElementById("profile-image-input").click();
  };

  useEffect(() => {
    if (imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile);
      dispatch(updateProfileImage(formData));
    }
  }, [imageFile, dispatch]);

  //validate
  const validateEmail = (value) => {
    return value?.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
  };

  const validatePhone = (value) => {
    return value?.match(/^[0-9]{10,15}$/i);
  };

  const helperEmail = useMemo(() => {
    if ((!email && !emailToched) || !activeEdit) {
      return {
        text: "",
      };
    }
    if (email === "" && emailToched)
      return {
        text: "Email kh??ng ???????c ????? tr???ng",
      };
    else {
      const isValid = validateEmail(email);
      return {
        text: !isValid ? "Email kh??ng h???p l???" : "",
      };
    }
  }, [email, emailToched, activeEdit]);

  const helperPhone = useMemo(() => {
    if ((!phone && !phoneToched) || !activeEdit) {
      return {
        text: "",
      };
    }
    if (phone === "" && phoneToched)
      return {
        text: "S??? ??i???n tho???i kh??ng ???????c ????? tr???ng",
      };
    else {
      const isValid = validatePhone(phone);
      return {
        text: !isValid ? "S??? ??i???n tho???i kh??ng h???p l???" : "",
      };
    }
  }, [phone, phoneToched, activeEdit]);

  const helperFirstName = useMemo(() => {
    if ((!firstName && !firstNameToched) || !activeEdit) {
      return {
        text: "",
      };
    }
    if (firstName === "" && firstNameToched)
      return {
        text: "T??n kh??ng ???????c ????? tr???ng",
      };
    return {
      text: "",
    };
  }, [firstName, firstNameToched, activeEdit]);

  const helperLastName = useMemo(() => {
    if ((!lastName && !lastNameToched) || !activeEdit) {
      return {
        text: "",
      };
    }
    if (lastName === "" && lastNameToched)
      return {
        text: "H??? kh??ng ???????c ????? tr???ng",
      };
    return {
      text: "",
    };
  }, [lastName, lastNameToched, activeEdit]);

  const onEditUserInfo = () => {
    setEmailToched(true);
    setFirstNameToched(true);
    setLastNameToched(true);
    setPhoneToched(true);
    if (
      helperEmail.text ==="" &&
      helperFirstName.text === "" &&
      helperLastName.text === "" &&
      helperPhone.text === ""
    ) {
      dispatch(
        updateProfileUser(userInfo, {
          firstName: firstName,
          lastName: lastName,
          email: email,
          phone: phone
        })
      );
      setActiveEdit(false)
    }
  };

  return (
    <div className="wrapper">
      <div className="left">
        <div onClick={onChangeProfileImage} class="content_img">
          <Avatar
            src={
              userInfo?.avatarImg?.substring(0).search('https://robohash.org/') === 0
              || userInfo?.avatarImg?.substring(0).search('azurewebsites.net/') === 0
                ? userInfo.avatarImg
                : `${process.env.REACT_APP_API_ENDPOINT}${userInfo.avatarImg}`
            }
            css= {{size:"$40",zIndex:"$1"}}
            className="avatar"
            zoomed
          />
          <div>B???m ????? ?????i ???nh</div>
          <br />
        </div>
        <h3>{userInfo.username}</h3>
        <form enctype="multipart/form-data" style={{ opacity: 0 }}>
          <input
            type="file"
            name="profile-image-input"
            id="profile-image-input"
            accept=".jpeg, .gif, .png, .JPG, .jpg, .PNG"
            onChange={onProfileImageChange}
          />
        </form>
      </div>
      <div className="right">
        <div className="info">
          <h3>
            Information
            { activeEdit ? (
              <AiOutlineCloseSquare 
                style={{
                    cursor: "pointer",
                    color: "#00bcd4",
                }}
                onClick={() => setActiveEdit(false)}
              />
            ) : (
              <BsPencilSquare
                style={{
                  cursor: "pointer",
                  color: "#00bcd4",
                }}
                onClick={() => setActiveEdit(true)}
              />
            )}
          </h3>

          <div className="info_data">
            <div className="data">
              <h4>H???</h4>
              <Input
                // clearable
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                helperColor="error"
                helperText={lastNameToched && helperLastName.text}
                onFocus={() => setLastNameToched(true)}
                type="text"
                bordered
                disabled={!activeEdit}
                className={activeEdit ? "user-info-input" : "user-info-input-disabled"}
                fullWidth
                color="primary"
                size="md"
                placeholder={ activeEdit ? "H???" : "Ch??a ??i???n h???" }
              />
            </div>
            <div className="data">
              <h4>T??n</h4>
              <Input
                // clearable
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                helperColor="error"
                helperText={firstNameToched && helperFirstName.text}
                onFocus={() => setFirstNameToched(true)}
                type="text"
                bordered
                disabled={!activeEdit}
                className={activeEdit ? "user-info-input" : "user-info-input-disabled"}
                fullWidth
                color="primary"
                size="md"
                placeholder={ activeEdit ? "T??n" : "Ch??a ??i???n t??n" }
              />
            </div>
          </div>
          <br />
          <div className="info_data">
            <div className="data">
              <h4>Email</h4>
              <Input
                // clearable
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                helperColor="error"
                helperText={emailToched && helperEmail.text}
                onFocus={() => setEmailToched(true)}
                type="email"
                bordered
                disabled={!activeEdit}
                className={activeEdit ? "user-info-input" : "user-info-input-disabled"}
                fullWidth
                color="primary"
                size="md"
                placeholder={activeEdit ? "Nh???p email" : "Ch??a ??i???n email"}
              />
            </div>
            <div className="data">
              <h4>S??? ??i???n tho???i</h4>
              <Input
                // clearable
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                helperColor="error"
                helperText={phoneToched && helperPhone.text}
                onFocus={() => setPhoneToched(true)}
                type="text"
                bordered
                disabled={!activeEdit}
                className={activeEdit ? "user-info-input" : "user-info-input-disabled"}
                fullWidth
                color="primary"
                size="md"
                placeholder={activeEdit ? "09xxxxxxxx" : "Ch??a ??i???n s??? ??i???n tho???i"}
              />
            </div>
          </div>
        </div>
        <div className="social_media">
          <button onClick={onEditUserInfo} style={{ visibility: activeEdit ? "visible" : "hidden" }} className="btn-save-detail">
            L??u th??ng tin
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
