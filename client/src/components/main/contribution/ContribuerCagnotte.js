import React, { Component } from 'react';
import { Col, Button, Popover, PopoverHeader, PopoverBody, InputGroup, Input, InputGroupAddon, Label, FormGroup, Form } from 'reactstrap';



/**
 * ContribuerCagnotte
 */
export class ContribuerCagnotte extends Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeMontant = this.handleChangeMontant.bind(this);
    this.handleChangeMessage= this.handleChangeMessage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      popoverOpen: false,
      name: '',
      montant: 0,
      message: ''
    };
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
    console.log(this.props.id);
    console.log(this.state.montant);
    console.log(this.state.name);
    console.log(this.state.message);
    const stackId = contract.methods["ContribuerCagnotte"].cacheSend(this.props.id, this.state.name, this.state.message, {value: (this.state.montant,"ether")});
    console.log(this.state.stackId);
    this.setState({stackId: stackId});
  }

  render() {
    return (
      <div>
        <Button id="PopoverCagnotte" color="primary" onClick={this.toggle}>
          Contribuer Cagnotte
        </Button>
        <Popover placement="auto" isOpen={this.state.popoverOpen} target="PopoverCagnotte" toggle={this.toggle}>
          <PopoverHeader>Votre contribution</PopoverHeader>
          <PopoverBody>
          <Col>
          <InputGroup>
            <Input placeholder="Prénom disruptif" onChange={this.handleChangeName} value={this.state.name} />
          </InputGroup>
            <InputGroup>
              <Input placeholder="Montant" onChange={this.handleChangeMontant} value={this.state.montant} />
              <InputGroupAddon addonType="append">mc2icoins</InputGroupAddon>
            </InputGroup>
            <Input type="textarea" name="text" id="exampleText" placeholder="Votre message" onChange={this.handleChangeMessage} value={this.state.message} />
            <Button color="primary" onClick={this.handleSubmit}>Valider</Button>
          </Col>
          </PopoverBody>
        </Popover>
      </div>
    );
  }
}

export default ContribuerCagnotte;
