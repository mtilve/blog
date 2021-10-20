import React from "react";
import Container from "react-bootstrap/Container";
import CardHome from "./CardHome";
import Row from "react-bootstrap/Row";

function GridHome(props) {
  return (
    <Container>
      <Row>
        {props.posts.map((post) => (
          <CardHome
            key={post.id}
            id={post.id}
            title={post.title}
            body={post.body}
            userId={post.userId}
            setShowError={props.setShowError}
            setShowSuccess={props.setShowSuccess}
          />
        ))}
      </Row>
    </Container>
  );
}

export default GridHome;
