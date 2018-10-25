import React, { Component } from 'react';
import { Col, Button, Popover, PopoverHeader, PopoverBody, InputGroup, Input, InputGroupAddon, Label, FormGroup, Form } from 'reactstrap';



/**
 * ContribuerCagnotte
 */
export class ContribuerCagnotte extends Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      popoverOpen: false
    };
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
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
          <Col lg={12}>
            <InputGroup>
              <Input placeholder="Montant" />
              <InputGroupAddon addonType="append">mc2icoins</InputGroupAddon>
            </InputGroup>
            <Form>
              <FormGroup>
                <Input type="textarea" name="text" id="exampleText" placeholder="Votre message"/>
              </FormGroup>
            </Form>
            <Button color="primary" onClick={this.toggle}>Valider</Button>
          </Col>
          </PopoverBody>
        </Popover>
      </div>
    );
  }
}

export default ContribuerCagnotte;
