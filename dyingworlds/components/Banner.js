import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";

export default function Banner() {
  return (
    <Container id="home">
      <br />
      <Image src={"/Dying_Worlds.jpg"} fluid />
    </Container>
  );
}
