import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import getWeb3 from "../ethereum/getWeb3";
import getContract from "../ethereum/getContract";
import contractDefinition from "../../build/contracts/NFTCollectible.json";

export default class MintFromWeb extends Component {
  state = {
    web3: null,
    contract: null,
    errorMessage: "",
    amount: 1,
    loading: false,
  };

  _onSubmitMint = async (event) => {
    event.preventDefault();
    const { contract, web3, amount } = this.state;

    this.setState({ loading: true, errorMessage: "" });
    try {
      let toPay = 0.05 * amount;
      const accounts = await web3.eth.getAccounts();

      await contract.methods.mintTokenFromWeb(amount).send({
        from: accounts[0],
        value: web3.utils.toWei(toPay.toString(), "ether"),
      });
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false });
  };

  async componentDidMount() {
    try {
      const web3 = await getWeb3();
      const contract = await getContract(web3, contractDefinition);
      this.setState({ web3, contract });
    } catch (error) {
      this.setState({
        errorMessage: "no web3 provider found - did you connect your wallet?",
      });
    }
  }
  render() {
    return (
      <Container>
        <h1>{this.state.amount}</h1>
        <Form onSubmit={this._onSubmitMint}>
          <Form.Check
            inline
            label="1"
            name="group1"
            type="radio"
            id="radio-1"
            onChange={() => {
              this.setState({ amount: 1 });
            }}
          />
          <Form.Check
            inline
            label="2"
            name="group1"
            type="radio"
            id="radio-2"
            onChange={() => {
              this.setState({ amount: 2 });
            }}
          />
          <Form.Check
            inline
            label="3"
            name="group1"
            type="radio"
            id="radio-3"
            onChange={() => {
              this.setState({ amount: 3 });
            }}
          />
          <Button variant="light" type="submit" disabled={this.state.loading}>
            {this.state.loading ? <Spinner animation="border" /> : "Mint!"}
          </Button>
        </Form>
        {!!this.state.errorMessage ? (
          <Alert variant="danger">{this.state.errorMessage}</Alert>
        ) : (
          <span></span>
        )}
      </Container>
    );
  }
}
