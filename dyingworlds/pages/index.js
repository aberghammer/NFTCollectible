import React, { Component } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Contents from "../components/Contents";
import LinkBar from "../components/LinkBar";
import Image from "next/image";
import Alert from "react-bootstrap/Alert";

import MintFromWeb from "../components/MintFromWeb";

import Container from "react-bootstrap/Container";

import getWeb3 from "../ethereum/getWeb3";
import getContract from "../ethereum/getContract";
import contractDefinition from "../../build/contracts/NFTCollectible.json";

export default class Home extends Component {
  state = {
    accounts: null,
    contract: null,
    web3: null,

    errorMessage: "",
  };
  async componentDidMount() {
    try {
      const web3 = await getWeb3();
      const contract = await getContract(web3, contractDefinition);
      this.setState({ web3, contract });
    } catch (error) {
      this.setState({
        errorMessage: "You can´t mint: Did you connect your Metamask?",
      });
      console.log(error.message);
    }
  }

  render() {
    let { contract, web3 } = this.state;
    return (
      <Container fluid style={{ backgroundColor: "black", color: "grey" }}>
        <Header />
        <LinkBar />
        <Contents />
        <MintFromWeb contract={contract} web3={web3} />
        {!!this.state.errorMessage ? (
          <Alert variant="danger" align="center">
            {this.state.errorMessage}
          </Alert>
        ) : (
          <span></span>
        )}
        <Footer />
      </Container>
    );
  }
}
