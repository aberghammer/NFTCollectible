import React, { Component } from "react";
import Layout from "../components/Layout";
import MintFromWeb from "../components/MintFromWeb";

export default class Home extends Component {
  render() {
    return (
      <Layout>
        <MintFromWeb />
      </Layout>
    );
  }
}
