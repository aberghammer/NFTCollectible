import React, { Component } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Banner from "../components/Banner";

import LinkBar from "../components/LinkBar";

import Container from "react-bootstrap/Container";

export default function Layout(props) {
  return (
    <Container fluid style={{ backgroundColor: "black", color: "grey" }}>
      <Header />
      <LinkBar />
      <Banner />
      {props.children}
      <Footer />
    </Container>
  );
}
