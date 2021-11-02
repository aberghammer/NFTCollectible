import React, { Component } from "react";

import Layout from "../components/Layout";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import getWeb3 from "../ethereum/getWeb3";
import getContract from "../ethereum/getContract";
import contractDefinition from "../../build/contracts/NFTCollectible.json";
import Image from "react-bootstrap/Image";

export default class Home extends Component {
  state = {
    web3: null,
    contract: null,
    isLoading: false,
    response: [],

    errorMessage: "",
  };

  _fetchData = async () => {
    try {
      this.setState({ isLoading: true });
      const web3 = await getWeb3();
      const networkId = await web3.eth.net.getId();
      const deployedAddress = contractDefinition.networks[networkId].address;

      const accounts = await web3.eth.getAccounts();
      const response = await fetch(
        `https://rinkeby-api.opensea.io/api/v1/assets?owner=${accounts[0]}&asset_contract_address=${deployedAddress}&order_direction=desc&offset=0&limit=20`
      );
      const responseJSON = await response.json();
      this.setState({ response: responseJSON.assets, isLoading: false });
    } catch (error) {
      alert("Keine Internetverbindung");
      this.setState({ isLoading: false });
    }
  };

  // async componentDidMount() {
  //   this._fetchData();
  // }

  render() {
    return (
      <Layout>
        <Container>
          <br></br>

          <h1>Here you can show your NFTs</h1>

          <Button
            variant="light"
            onClick={this._fetchData}
            disabled={this.state.loading}
          >
            {this.state.loading ? (
              <Spinner animation="border" />
            ) : (
              "Load your NFTs"
            )}
          </Button>

          {this.state.response.map((resp) => {
            return (
              <div>
                <br></br>
                <Image src={resp.image_url}></Image>
                <p>{resp.token_id}</p>
              </div>
            );
          })}
        </Container>
      </Layout>
    );
  }
}
