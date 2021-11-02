import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Link from "next/link";

export default function LinkBar() {
  return (
    <Container id="home">
      <Navbar style={{ backgroundColor: "black" }} variant="dark" fixed="top">
        <Container>
          <Nav className="me-auto">
            <Link href="/#home" passHref>
              <Nav.Link>Home</Nav.Link>
            </Link>

            <Link href="/#roadmap" passHref>
              <Nav.Link>Roadmap</Nav.Link>
            </Link>

            <Link href="/#mint" passHref>
              <Nav.Link>Mint</Nav.Link>
            </Link>
            <Link href="/ShowNFTs" passHref>
              <Nav.Link>Show your NFTs</Nav.Link>
            </Link>
          </Nav>
        </Container>
      </Navbar>
    </Container>
  );
}
