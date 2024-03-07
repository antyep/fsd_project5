// Header.jsx

import React from 'react';
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css"; // Asegúrate de que este archivo CSS esté en la misma carpeta que Header.jsx
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, userData } from "../../pages/userSlice";
import logo from '../../img/logo.png';

export const Header = () => {
 const navigate = useNavigate();
 const dispatch = useDispatch();
 const userRdxData = useSelector(userData);

 const token = userRdxData.credentials.token;
 const decoded = userRdxData.credentials.userData;

 const logMeOut = () => {
    dispatch(logout({credentials: {}}));
    setTimeout(() => {
      navigate("/");
    });
 };

 return (
    <>
      {/* Logo fijo en la parte superior */}
      <div className="logo-container">
        <img src={logo} className="MainLogo" alt="Logo" />
      </div>

      {/* Navbar de Bootstrap con fondo personalizado */}
      <Navbar expand="lg" className="navbar-custom" id="navbar">
        <Container>
          <Navbar.Brand href="navbar-main" className="mx-auto">
            {/* Aquí puedes colocar un texto de marca si lo prefieres, pero el logo ya está arriba */}
          </Navbar.Brand>
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
                ) : (
                 <>
                    <NavDropdown.Item href="profile">Profile</NavDropdown.Item>
                    {decoded.role === 'ADMIN' 
                      ? <NavDropdown.Item href="admin">Admin</NavDropdown.Item> 
                      : <NavDropdown.Item href="">My appointments</NavDropdown.Item>}
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={() => logMeOut()}>Log Out</NavDropdown.Item>
                 </>
                )}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
 );
};
