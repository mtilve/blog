import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useState } from "react";

function CustomModal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function deletePost() {
    const baseURL = process.env.REACT_APP_POSTS_GET + "/" + props.post.id;
    axios
      .delete(baseURL, {})
      .then((response) => {
        props.setShowModal(false);
        if (response.status === 200) {
          props.post.setShowSuccess(true);
        } else {
          props.post.setShowError(true);
        }
      })
      .catch((error) => {
        props.setShowModal(false);
        props.post.setShowError(true);
      });
  }

  return (
    <>
      <Modal
        show={props.show ? handleShow : handleClose}
        onHide={props.close}
        backdrop="static"
        keyboard={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.body}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => deletePost(props)}>
            Continuar
          </Button>
          <Button variant="danger" onClick={props.close}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CustomModal;
