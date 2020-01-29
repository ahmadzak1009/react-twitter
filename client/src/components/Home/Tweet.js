import React from "react";
import { Container, Card } from "react-bootstrap";

const Tweet = props => {
  const { tweet } = props;

  return (
    <>
      <Container>
        <Card className="my-3">
          <Card.Body>
            <Card.Title>{tweet.owner}</Card.Title>
            <Card.Text>{tweet.content}</Card.Text>
            <p>
              {tweet.likes.length}{" "}
              <a href="#like" className="text-primary">
                Like
              </a>
            </p>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Tweet;
