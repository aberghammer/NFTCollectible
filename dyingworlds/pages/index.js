import React, { Component } from "react";
import Layout from "../components/Layout";
import MintFromWeb from "../components/MintFromWeb";
import Contents from "../components/Contents";

export default class Home extends Component {
  render() {
    return (
      <Layout>
        <Contents />
        <MintFromWeb />
      </Layout>
    );
  }
}
