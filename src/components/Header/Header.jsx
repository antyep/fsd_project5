import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, userData } from "../../pages/userSlice";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const userRdxData = useSelector(userData)

  const token = userRdxData.credentials.token
  const decoded = userRdxData.credentials.userData

  const logMeOut = () => {
    dispatch(logout({credentials: {}}))
    setTimeout(() => {
      navigate("/artists");
    });
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary" id="navbar">
      <Container>
        <Navbar.Brand href="navbar-main">KD Tattoo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="Artists">Artists</Nav.Link>
            <NavDropdown title="You have an account?" id="basic-nav-dropdown">
              {!token ? (
                <>
                  <NavDropdown.Item href="#action/3.1">Sign In</NavDropdown.Item>
                  <NavDropdown.Item href="register">Register</NavDropdown.Item>
                </>
              ) : decoded.role === "ADMIN" ? (
                <>
                  <NavDropdown.Item href="profile">Profile</NavDropdown.Item>
                  <NavDropdown.Item href="admin">Admin</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={() => logMeOut()}>Log Out</NavDropdown.Item>
                </>
              ) : (
                <>
                  <NavDropdown.Item href="profile">Profile</NavDropdown.Item>
                  <NavDropdown.Item href="">My appointments</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={() => logMeOut()}>Log Out</NavDropdown.Item>
                </>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
