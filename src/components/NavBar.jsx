import { Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../../src/logo.svg";

function NavBar() {
  return (
    <Navbar bg="light" sticky="top" style={{minHeight: '5vh'}}  collapseOnSelect expand="sm">
      <Container className="mx-auto">
        <Navbar.Brand>
        <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
          Data Visualization Web App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/eq-works-webapp/" eventKey="1">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/eq-works-webapp/graph" eventKey="2">
              <Nav.Link>Graph</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/eq-works-webapp/table" eventKey="3">
              <Nav.Link>Table</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/eq-works-webapp/map" eventKey="4">
              <Nav.Link>Map</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
