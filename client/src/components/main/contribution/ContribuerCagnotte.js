import React, { Component } from 'react';
import { Col, Row, Button, Popover, PopoverHeader, PopoverBody, InputGroup, Input, InputGroupAddon, Label, FormGroup, Form } from 'reactstrap';



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
          Contribuer à cette cagnotte
        </Button>
        <Popover placement="auto" isOpen={this.state.popoverOpen} target="PopoverCagnotte" toggle={this.toggle}>
          <PopoverHeader>Votre contribution</PopoverHeader>
          <PopoverBody>
          <Row>
            <Col>
              <InputGroup>
                <Input placeholder="Montant" />
                <InputGroupAddon addonType="append">mc²icoins</InputGroupAddon>
              </InputGroup>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Form>
                <FormGroup>
                  <Input type="textarea" name="text" id="exampleText" placeholder="Votre message"/>
                </FormGroup>
              </Form>
              <Button color="primary" onClick={this.toggle}>Valider</Button>
            </Col>
          </Row>
          </PopoverBody>
        </Popover>
      </div>
    );
  }
}

export default ContribuerCagnotte;
