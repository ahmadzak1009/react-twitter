import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const Context = createContext();

export const ContextProvider = props => {
  const [tweets, setTweets] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("/tweets")
      .then(res => setTweets(res.data))
      .catch(err => console.log(err));
  }, [setTweets]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const idUser = localStorage.getItem("idUser");
    if (!token || !idUser) return setUser(null);

    axios
      .get(`/users/${idUser}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        if (!user) setUser(res.data);
      })
      .catch(err => {
        console.log(err);
        localStorage.removeItem("token");
        localStorage.removeItem("idUser");
      });
  }, [user]);

  return (
    <Context.Provider value={{ tweets, setTweets, user, setUser }}>
      {props.children}
    </Context.Provider>
  );
};
