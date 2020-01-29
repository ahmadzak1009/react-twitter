import React, { setGlobal } from "reactn";
import Home from "./components/Home/Home";

setGlobal({
  tweets: [],
  user: null
});

function App() {
  return (
    <>
      <Home />
    </>
  );
}

export default App;
