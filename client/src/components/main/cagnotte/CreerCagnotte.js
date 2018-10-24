import React, { Component } from 'react';
import {  Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Form, Input, Label } from 'reactstrap';
import { Redirect } from 'react-router-dom'

import Loading from '../Loading'

class CreerCagnotte extends React.Component  {

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      stackId: null,
      value: '',
      toCagnotte: false,
    };

    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
      value: '',
      toCagnotte: false,
      stackId: ''
    });
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.handleSubmit(event);
    }
  }

  handleSubmit(event) {
    const { drizzle, drizzleState } = this.props;

    const contract = drizzle.contracts.Mc2iCagnotte;
    const stackId = contract.methods["CreerCagnotte"].cacheSend(this.state.value);
    console.log(this.state.stackId);
    this.setState({stackId: stackId});
  }

  render() {
    if (this.state.toCagnotte.toString() === "true") {
      const { transactions, transactionStack } = this.props.drizzleState;
      console.log("Test");
      const txHash = transactionStack[this.state.stackId];
      if (!txHash) {return <Loading />}
      if (transactions[txHash].status === 'success') {return <Redirect to='/cagnotte/1' />}
    }
    return (
      <div>
        <Button color="primary" onClick={this.toggle}>Créer une Cagnotte</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Création d'une cagnotte</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="exampleEmail">Nom de la cagnotte</Label>
                <Input type="text" name="cagnotte" value={this.state.value} onKeyPress={this.handleKeyPress} id="nomcagnotte" onChange={this.handleChange} placeholder="Pot de départ disruptif" />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleSubmit}>Créer</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Annuler</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }

}

export default CreerCagnotte;
