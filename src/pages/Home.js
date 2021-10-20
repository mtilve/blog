import NavBar from "../components/NavBar";
import GridHome from "../components/GridHome";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";
import axios from "axios";
import CustomAlert from "../components/CustomAlert";

function Home() {
  
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const baseURL = process.env.REACT_APP_POSTS_GET;
  const [posts, setPost] = useState([]);

  useEffect(() => {
    axios.get(`${baseURL}`).then((response) => {
      setPost(response.data);
    });
  }, []);

  let content;

  if (posts.length === 0) {
    content = (
      <Row>
        <Col xs={6} md={4} className="d-flex justify-content-center"></Col>
        <Col xs={6} md={4} className="d-flex justify-content-center">
          No hay posts
        </Col>
        <Col xs={6} md={4} className="d-flex justify-content-center"></Col>
      </Row>
    );
  } else {
    content = (
      <GridHome
        posts={posts}
        setShowError={setShowError}
        setShowSuccess={setShowSuccess}
      />
    );
  }

  return (
    <div className="container">
      <NavBar home={true} create={false} detail={false} edit={false} />
      <div className="form-wrapper">
        {showError && (
          <CustomAlert
            title="Error."
            error={true}
            body="Error al eliminar el post."
            show={showError}
            close={() => setShowError(false)}
          />
        )}
        {showSuccess && (
          <CustomAlert
            title="Éxito."
            error={false}
            body="Éxito al eliminar el post."
            show={showSuccess}
            close={() => setShowSuccess(false)}
          />
        )}

        {content}
      </div>
    </div>
  );
}

export default Home;
