import React from "react";
import Modal from "react-modal";
import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import "./RegisterModal.scss";
import bcrypt from "bcryptjs";

Modal.setAppElement("#root");
export default function LoginModal(props) {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const closeLogin = () => {
    props.setLoginIsOpen(false);
    setUsername("");
    setPassword("");
    setError("");
  };
  const handleLoginClick = () => {
    if (!userName.trim()) {
      setError("Please enter a user name");
      return;
    }
    if (!password) {
      setError("Please enter a password");
      return;
    }
    axios
      .get("http://localhost:8081/login", {
        params: {
          userName: userName,
        },
      })
      .then((res) => {
        if (!res.data.rows[0] || !bcrypt.compareSync(password, res.data.rows[0].password)){
          setError("username or password is invalid");
          return;
        }
        if (res.data.rows[0].active === true) {
          setError("this user is already logged in");
          return;
        }
        axios.put("http://localhost:8081/login", {
          userName: res.data.rows[0].username,
          active: true
        }).then(resActive=>{
          if(resActive.data.rows[0]){
            sessionStorage.setItem('username',resActive.data.rows[0].username);
            sessionStorage.setItem('userid',resActive.data.rows[0].id);
            closeLogin();
          }
        }
        )
      });
  };
  return (
    <Modal
      isOpen={props.loginIsOpen}
      onRequestClose={closeLogin}
      style={{
        overlay: {
          background: "rgba(0, 0, 0, 0.6)",
          zIndex: 1000,
        },
        content: {
          height: "250px",
          width: "350px",
          top: "150px",
          left: "50%",
          marginLeft: "-175px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        },
      }}
    >
      <h1>Login</h1>
      <div className="textFields">
        <TextField
          onChange={(e) => setUsername(e.target.value)}
          label="User Name"
          type="text"
          value={userName}
          InputLabelProps={{
            shrink: true,
            style: {
              fontSize: 20,
            },
          }}
        />
        <TextField
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          type="password"
          value={password}
          InputLabelProps={{
            shrink: true,
            style: {
              fontSize: 20,
            },
          }}
        />
      </div>
      <div className="buttons">
        <Button onClick={handleLoginClick}>Login</Button>
        <Button onClick={closeLogin}>Cancel</Button>
      </div>
      <div style={{ color: "red" }}>{error}</div>
    </Modal>
  );
}
