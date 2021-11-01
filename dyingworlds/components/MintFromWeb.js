import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";

const COST = 0.05;

export default class MintFromWeb extends Component {
  state = { amount: 0, loading: false, errorMessage: "" };

  _onSubmitMint = async (event) => {
    event.preventDefault();
    const { contract, web3 } = this.props;
    const { amount } = this.state;
    var BN = web3.utils.BN;

    console.log(amount);

    //const price = 0.05 * amount;
    this.setState({ loading: true, errorMessage: "" });
    try {
      let toPay = amount * COST;
      const accounts = await web3.eth.getAccounts();

      await contract.methods.mintTokenFromWeb(amount).send({
        from: accounts[0],
        value: web3.utils.toWei(toPay.toString(), "ether"),
      });
    } catch (err) {
      this.setState({ errorMessage: err.message });
      console.log("error" + err);
    }
    this.setState({ loading: false });
  };

  render() {
    return (
      <Container id="mint">
        <br />
        <h2>Mint up to three tokens per account!</h2>
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
          {!!this.state.errorMessage ? (
            <Alert variant="danger">{this.state.errorMessage}</Alert>
          ) : (
            <span></span>
          )}
        </Form>
        <p>
          Some other information... Lorem ipsum dolor sit amet, consectetuer
          adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa
          strong. Cum sociis natoque penatibus et magnis dis parturient montes,
          nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque
          eu, pretium quis, sem.
        </p>
      </Container>
    );
  }
}
