import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FaTrash } from "react-icons/fa";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useHistory } from "react-router";
import { useState } from "react";
import Modal from "./CustomModal";

function CardHome(props) {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);

  function detailHandler(post) {
    history.push({
      pathname: "/detail",
      state: { detail: post.id },
    });
  }

  function deleteHandler(post) {
    setShowModal(true);
  }

  function editHandler(post) {
    history.push({
      pathname: "/edit",
      state: { detail: post.id },
    });
  }

  return (
    <>
      {showModal && (
        <Modal
          title="Eliminar post"
          body="¿Seguro desea eliminar el post?"
          post={props}
          setShowError={props.setShowError}
          setShowSuccess={props.setShowSuccess}
          setShowModal={setShowModal}
          show={showModal}
          close={() => setShowModal(false)}
        />
      )}
      <Col
        xs={8}
        md={8}
        className="d-flex justify-content-right mb-2"
        key={props.id}
      >
        <Card className="mt-2">
          <Row>
            <Card.Title className="m-2">
              <Col xs={12} md={12}>
                {props.title}
              </Col>
            </Card.Title>
          </Row>
        </Card>
      </Col>

      <Col xs={4} md={4}>
        <Button
          variant="success"
          className="w-responsive text-center m-2"
          onClick={() => detailHandler(props)}
        >
          Detalle
        </Button>

        <Button
          variant="primary"
          className="w-responsive text-center m-2"
          onClick={() => editHandler(props)}
        >
          Editar
        </Button>

        <Button
          variant="danger"
          className="w-responsive text-center m-2"
          onClick={() => deleteHandler(props)}
        >
          <FaTrash />
        </Button>
      </Col>
    </>
  );
}

export default CardHome;
