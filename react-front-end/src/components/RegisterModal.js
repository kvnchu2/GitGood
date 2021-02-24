import React from "react";
import Modal from "react-modal";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useState } from "react";
import "./RegisterModal.scss";
import axios from "axios";
import bcrypt from "bcryptjs";
Modal.setAppElement("#root");
export default function RegisterModal(props) {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const closeRegister = () => {
    props.setRegisterIsOpen(false);
    setUsername("");
    setPassword("");
    setError("");
  };

  const handleRegisterClick = () => {
    if (!userName.trim() || !password) {
      setError("User name and password cannot be empty");
      return;
    }
    var salt = bcrypt.genSaltSync(10);
    var hashed = bcrypt.hashSync(password, salt);
    axios
      .put("http://localhost:8081/register", {
        userName: userName,
        password: hashed,
      })
      .then((res) => {
        if (res.data.code && res.data.code === "23505") {
          setError("User name already exist");
          return;
        }
        console.log(res.data.rows[0]);
        sessionStorage.setItem("username", res.data.rows[0].username);
        sessionStorage.setItem("userid", res.data.rows[0].id);
        closeRegister();
      });
  };
  return (
    <Modal
      isOpen={props.registerIsOpen}
      onRequestClose={closeRegister}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.6)",
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
      <h1>Register</h1>
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
        <Button onClick={handleRegisterClick}>Register</Button>
        <Button onClick={closeRegister}>Cancel</Button>
      </div>
      <div style={{ color: "red" }}>{error}</div>
    </Modal>
  );
}
