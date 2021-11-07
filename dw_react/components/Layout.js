import React from "react";
import Container from "react-bootstrap/Container";
import Header from "./Header";

export default function Layout(props) {
  return (
    <Container fluid style={{ backgroundColor: "black", color: "grey" }}>
      <Header />
      {props.children}
    </Container>
  );
}
