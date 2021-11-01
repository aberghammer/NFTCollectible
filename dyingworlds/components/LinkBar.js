import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

export default function LinkBar() {
  return (
    <Container id="home">
      <Navbar style={{ backgroundColor: "black" }} variant="dark" fixed="top">
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#roadmap">Roadmap</Nav.Link>
            <Nav.Link href="#mint">Mint</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </Container>
  );
}
