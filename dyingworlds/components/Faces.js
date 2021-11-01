import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function LinkBAr() {
  return (
    <Container>
      <Row>
        <Col xs={6} md={4}>
          <Image src="/Coman.png" thumbnail />
        </Col>
        <Col xs={6} md={4}>
          <Image src="/Diana.png" thumbnail />
        </Col>
        <Col xs={6} md={4}>
          <Image src="/Leah.png" thumbnail />
        </Col>
      </Row>
    </Container>
  );
}
