import React, { Component } from 'react';
import { Col, Row, Popover, PopoverHeader, PopoverBody, InputGroup, Input, InputGroupAddon, Label, FormGroup, Form } from 'reactstrap';

import { Button, Intent } from "@blueprintjs/core";

/**
 * ContribuerCagnotte
 */
export class ContribuerCagnotte extends Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      popoverOpen: false,
      name: '',
      montant: 0,
      message: ''
    };

      this.toggle = this.toggle.bind(this);
      this.handleChangeName = this.handleChangeName.bind(this);
      this.handleChangeMontant = this.handleChangeMontant.bind(this);
      this.handleChangeMessage= this.handleChangeMessage.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  handleChangeName(event) {
    this.setState({name: event.target.value});
  }

  handleChangeMontant(event) {
    this.setState({montant: event.target.value});
  }

  handleChangeMessage(event) {
    this.setState({message: event.target.value});
  }

  handleSubmit(event) {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.Mc2iCagnotte;
    const stackId = contract.methods["ContribuerCagnotte"].cacheSend(this.props.id, this.state.name, this.state.message, { value: (drizzle.web3.utils.toWei(this.state.montant,"ether"))});
    this.setState({stackId: stackId});
  }

  render() {
    return (
      <div>
        <Button id="PopoverCagnotte" large intent={Intent.PRIMARY} icon="dollar" onClick={this.toggle}>
          Contribuer
        </Button>
        <Popover placement="auto" isOpen={this.state.popoverOpen} target="PopoverCagnotte" toggle={this.toggle}>
          <PopoverHeader>Votre contribution</PopoverHeader>
          <PopoverBody>
            <Row>
              <Col>
                <Input placeholder="Nom Prénom" onChange={this.handleChangeName} value={this.state.name}  />
              </Col>
            </Row>
            <br />
            <Row>
            <Col>
              <InputGroup>
                <Input placeholder="Montant" onChange={this.handleChangeMontant} value={this.state.montant} />
                <InputGroupAddon addonType="append">mc²icoins</InputGroupAddon>
              </InputGroup>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Form>
                <FormGroup>
                  <Input type="textarea" name="text" placeholder="Votre message" onChange={this.handleChangeMessage} value={this.state.message}/>
                </FormGroup>
              </Form>
              <Button color="primary" onClick={this.handleSubmit}>Valider</Button>
            </Col>
          </Row>
          </PopoverBody>
        </Popover>
      </div>
    );
  }
}

export default ContribuerCagnotte;
