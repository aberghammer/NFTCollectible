import React, { Component } from "react";
import Image from "next/image";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";

import Layout from "../components/Layout";
import Contents from "../components/Contents";
import MintFromWeb from "../components/MintFromWeb";

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
      <Layout>
        <Contents />
        <MintFromWeb contract={contract} web3={web3} />
        {!!this.state.errorMessage ? (
          <Alert variant="danger" align="center">
            {this.state.errorMessage}
          </Alert>
        ) : (
          <span></span>
        )}
      </Layout>
    );
  }
}
