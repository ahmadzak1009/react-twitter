import React, { useContext } from "react";
import Tweet from "./Tweet";
import { Context } from "../../Context";

const Content = props => {
  const { tweets } = useContext(Context);

  if (!tweets[0]) {
    return (
      <div className="text-center mt-5">
        <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
        <span className="sr-only">Loading...</span>
      </div>
    );
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
