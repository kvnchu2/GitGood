import React from "react";
import useApplicationData from "./useApplicationData";
import "./App.scss";
import Search from "./components/search.js";
import OppositeTimeline from "./components/OppositeTimeline.js";
import { userData, repoData } from "./backupData";
import Filter from "./components/Filter";
import NavBar from "./components/AppBar.js";
import { useState } from "react";
import ShowLiked from "./components/showLiked";
import { setPageStateUpdate } from "@material-ui/data-grid";
import Show from "./components/Show";
import RegisterModal from "./components/RegisterModal";
import LoginModal from "./components/LoginModal";
import axios from "axios";

export default function Application(props) {
  window.addEventListener("beforeunload", function (e) {
    e.preventDefault();
    if (sessionStorage.getItem("username")) {
      axios
        .put("http://localhost:8081/login", {
          userName: sessionStorage.getItem("username"),
          active: false,
        })
        .then((res) => {
          console.log("logged out");
        });
    }
  });
  window.onload = function () {
    if (sessionStorage.getItem("username")) {
      axios
        .put("http://localhost:8081/login", {
          userName: sessionStorage.getItem("username"),
          active: true,
        })
        .then((res) => {
          console.log(res);
          console.log("logged in");
        });
    }
  };
  const {
    setStorage,
    setUser,
    fetchData,
    state,
    errorMsg,
  } = useApplicationData();
  const [registerIsOpen, setRegisterIsOpen] = useState(false);
  const [loginIsOpen, setLoginIsOpen] = useState(false);
  const [filterParam, setParam] = useState();
  const setFilter = (param) => {
    setParam((prev) => param);
  };
  const [show, setShow] = useState("main");
  const toLiked = () => {
    setShow("liked");
  };
  const toMain = () => {
    setShow("main");
  };
  return (
    <main className="App">
      <NavBar
        toLiked={toLiked}
        setStorage={setStorage}
        setRegisterIsOpen={setRegisterIsOpen}
        setLoginIsOpen={setLoginIsOpen}
      />
      <section className="main-container">
        <div id="search-and-filter">
          <Search fetchData={fetchData} toMain={toMain} setParam={setParam} />
          <div id="errorMsg">{errorMsg}</div>
          <Filter
            setFilter={setFilter}
            repositories={state.repositories}
          ></Filter>
        </div>
        {show === "main" &&
          (state.loginUser ? (
            <Show
              avatar={state.avatar}
              loginUser={state.loginUser}
              name={state.name}
              filterParam={filterParam}
              repositories={state.repositories}
            />
          ) : (
            <div id="show-question-mark">
              <img src={state.avatar} alt="nothing"></img>
            </div>
          ))}
        {show === "liked" && <ShowLiked toMain={toMain} />}
        <RegisterModal
          registerIsOpen={registerIsOpen}
          setRegisterIsOpen={setRegisterIsOpen}
        ></RegisterModal>
        <LoginModal
          loginIsOpen={loginIsOpen}
          setLoginIsOpen={setLoginIsOpen}
        ></LoginModal>
      </section>
    </main>
  );
}
