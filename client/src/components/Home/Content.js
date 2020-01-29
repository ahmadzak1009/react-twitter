import React, { useGlobal, useEffect } from "reactn";
import axios from "axios";
import Tweet from "./Tweet";

const Content = props => {
  const [values, setValues] = useGlobal();
  const { tweets } = values;

  useEffect(() => {
    axios
      .get("/tweets")
      .then(res => res.data)
      .then(data => {
        setValues(v => ({
          tweets: data
        }));
        console.log(values);
      });
  }, []);

  if (!tweets[0]) {
    return <center>Loading...</center>;
  } else {
    return (
      <>
        {tweets.map(tweet => (
          <Tweet key={tweet._id} tweet={tweet} />
        ))}
      </>
    );
  }
};

export default Content;
