import React, { useContext, useState } from "react";
import { Container, Card, ListGroup, Form, FormControl } from "react-bootstrap";
import { Context } from "../../Context";
import axios from "axios";

const Tweet = props => {
  const { user, setTweets } = useContext(Context);
  const { tweet } = props;

  const [comment, setComment] = useState("");
  const [showComment, setShowComment] = useState(false);

  const likeClassName = () => {
    if (!user) return "fa fa-heart-o";
    if (!tweet.likes.find(like => like === user._id)) return "fa fa-heart-o";
    return "fa fa-heart text-primary";
  };

  const onLike = () => {
    if (!user) return window.alert("you must login first!");

    axios
      .put("/tweets/like", {
        idTweet: tweet._id,
        idUser: user._id
      })
      .then(res => res.data)
      .then(data => {
        setTweets(data);
      })
      .catch(err => console.log(err));
  };

  const onComment = () => {
    setShowComment(!showComment);
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (!user) return window.alert("you must login first!");

    try {
      const response = await axios.put("/tweets/comment", {
        idTweet: tweet._id,
        idUser: user._id,
        username: user.username,
        comment
      });
      const data = await response.data;
      setTweets(data);
      setComment("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Container>
        <Card className="my-3">
          <Card.Body>
            <Card.Title>{tweet.owner}</Card.Title>
            <Card.Text>{tweet.content}</Card.Text>
          </Card.Body>
          <Card.Footer className="d-flex justify-content-around align-items-center">
            <div onClick={onLike} style={{ cursor: "pointer" }}>
              <span className="mr-1">{tweet.likes.length}</span>
              <i className={likeClassName()}></i>
            </div>
            <div onClick={onComment} style={{ cursor: "pointer" }}>
              <span className="mr-1">{tweet.comments.length}</span>
              <i className="fa fa-comment-o" style={{ cursor: "pointer" }}></i>
            </div>
          </Card.Footer>
          {showComment ? (
            <>
              <Card.Footer>
                <h5>Comments ({tweet.comments.length})</h5>
                <ListGroup variant="flush">
                  {tweet.comments.map(comment => (
                    <Comment key={comment._id} comment={comment} />
                  ))}
                </ListGroup>
              </Card.Footer>
              <Card.Footer>
                <Form onSubmit={onSubmit}>
                  <FormControl
                    autoFocus
                    type="text"
                    placeholder="Write comment here..."
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                  />
                </Form>
              </Card.Footer>
            </>
          ) : null}
        </Card>
      </Container>
    </>
  );
};

const Comment = props => {
  const { comment } = props;
  return (
    <>
      <ListGroup.Item>
        <strong>{comment.username}</strong> {comment.comment}
      </ListGroup.Item>
    </>
  );
};

export default Tweet;
