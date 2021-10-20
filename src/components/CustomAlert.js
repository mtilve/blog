import React from "react";
import Alert from "react-bootstrap/Alert";

function CustomAlert(props) {

  return (
    <>
      <Alert
        show={true}
        onClose={props.close}
        variant={props.error ? "danger" : "success"}
        dismissible={true}
      >
        <Alert.Heading>{props.title}</Alert.Heading>
        <p>{props.body}</p>
      </Alert>
    </>
  );
}

export default CustomAlert;
