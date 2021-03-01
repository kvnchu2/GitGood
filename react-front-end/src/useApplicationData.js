import axios from 'axios';
import { useState, useEffect } from "react";
import dotenv from 'dotenv';

//---------------UNCOMMENT IF USING BACKUP DATA----------------
// import {userData, repoData} from "./backupData.js"


export default function useApplicationData() {
  const [state, setState] = useState({
    avatar: "https://github.githubassets.com/images/modules/logos_page/Octocat.png",
    loginUser:"",
    name:"",
    url: "",
    repoUrl: "",
    user: "",
    repositories: []
  });
  useEffect(()=>{
    console.log("initial render");
  },[])
  useEffect(()=>{
    setState( prev =>( {...prev, url: `https://api.github.com/users/${state.user}`, repoUrl: `https://api.github.com/users/${state.user}/repos`}))
  },[state.user])
  
  dotenv.config();
  //------------COMMENT OUT THIS FETCHDATA IF USING BACKUP DATA--------------
  const fetchData = (userName) => {
    
    Promise.all([
      axios.get(`https://api.github.com/users/${userName}`), // You can simply make your requests to “/api/whatever you want”
      axios.get(`https://api.github.com/users/${userName}/repos`),
      axios.get('http://localhost:8081/repositories', {params: {
        userName: userName
    }})
    ])
    .then((all) => {
      console.log(all[2].data)
      setState(prev => ({
        ...prev, user:userName, avatar: all[0].data.avatar_url, loginUser: all[0].data.login, name: all[0].data.name, repositories: all[2].data.user.repositories.nodes
      }));
    })  
  }
  
  const setUser = (value) => {
    setState((prev)=>({...prev,user: value
    }));
  }
  //--------------UNCOMMENT TO USE FOR BACKUP DATA--------------------------
  // const fetchData = (e) => {
  //   e.preventDefault();
  //     setState(prev => ({
  //       ...prev, avatar: userData.avatar_url, loginUser: userData.login, name: userData.name, repositories: repoData 
  //     }));
    
  // }


  const setStorage = (login) => {
    sessionStorage.setItem('username', login)
  }
  

  return { setStorage, setUser, fetchData, state};
}