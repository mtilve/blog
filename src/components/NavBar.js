import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

function NavBar(props) {

  const history = useHistory();

  function logoutHandler(){
    localStorage.removeItem("Token");
    history.push("/");
  }

  return (
      <Navbar expand="lg" bg="dark" variant="dark"  sticky="top">
        <Navbar.Brand className="m-2" href="/">Blog</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          {props.home ? (
            <Link className="nav-link disabled" to="/home">
              Inicio
            </Link>
          ) : (
            <Link className="nav-link" to="/home">
              Inicio
            </Link>
          )}
          {props.create ? (
            <Link className="nav-link disabled" to="/create">
              Crear
            </Link>
          ) : (
            <Link className="nav-link" to="/create">
              Crear
            </Link>
          )}
          {props.edit ? (
            <Link className="nav-link disabled" to="/edit">
              Editar
            </Link>
          ) : (
            <></>
          )}
          {props.detail ? (
            <Link className="nav-link disabled" to="/detail">
              Detalle
            </Link>
          ) : (
            <></>
          )}
          <Nav
            className="mr-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          ></Nav>
        <Nav className="me-auto"></Nav>
        <Nav>
        <Button className="m-2" type="button" variant="light"onClick={logoutHandler}>Logout</Button>
        </Nav>
        </Navbar.Collapse>
      </Navbar>
  );
}

export default NavBar;