import React from "react";
import MyNavbar from "../layout/MyNavbar";
import Content from "./Content";

const Home = props => {
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   const idUser = localStorage.getItem("idUser");
  //   if (!token || !idUser) {
  //     localStorage.removeItem("token");
  //     localStorage.removeItem("idUser");
  //     return props.history.push("/login");
  //   }
  // }, []);
  return (
    <>
      <MyNavbar />
      <Content />
    </>
  );
};

export default Home;
