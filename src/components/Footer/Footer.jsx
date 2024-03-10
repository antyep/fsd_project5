import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';

export const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md={4}>
          <h5>Contact</h5>
            <li><a href="#">Contact</a></li>
            <p></p>
          </Col>
          <Col md={4}>
            <h4 className="MediaBox">Social Media</h4>
            <p>Instagram: <br></br><br></br> @KDTattooStudio</p>
            <div className="social-icons">
              <a href="#"><i className="bi bi-instagram"></i></a>
              <a href="#"><i className="bi bi-facebook"></i></a>
              <a href="#"><i className="bi bi-twitter"></i></a>
            </div>
          </Col>
          <Col md={4}>
            <h4>Shortcuts</h4>
            <ul>
              <h5><a href="#">Home</a></h5>
              <h5><a href="#">About Us</a></h5>
              <h5><a href="#">Gallery</a></h5>
            </ul>
          </Col>
        </Row>
      </Container>
      <div className="footer-bottom">
        <Container>
          <p>&copy; All rights reserved.</p>
        </Container>
      </div>
    </footer>
  );
};


