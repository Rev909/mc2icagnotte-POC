import React, { Component } from 'react';
import { Button, Classes, Dialog, Intent, Text, InputGroup } from "@blueprintjs/core";
import { Redirect } from 'react-router-dom'

import Loading from '../Loading'

class CreerCagnotte extends React.Component  {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      stackId: null,
      value: '',
      toCagnotte: false,
      loading: false
    };

    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
      value: '',
      toCagnotte: false,
      stackId: '',
      loading: false
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
    const stackId = contract.methods["CreerCagnotte"].cacheSend(this.state.value)
    this.setState({stackId: stackId, toCagnotte: true, loading: true});
  }


  render() {
    if (this.state.toCagnotte.toString() === "true") {
      const contract = this.props.drizzle.contracts.Mc2iCagnotte;
      const { transactions, transactionStack } = this.props.drizzleState;
      const txHash = transactionStack[this.state.stackId];
      if (txHash) {
        if (transactions[txHash].status === 'success') {
          const id = transactions[txHash].receipt.events.CreationCagnotte.returnValues[0];
          this.toggle();
          return <Redirect push to={'/cagnotte/' + id} />
        }
      }
    }

    return (
      <div>
        <Button minimal="true" icon="plus" onClick={this.toggle} text="Créer une cagnotte" />
        <Dialog className="dialog-cagnotte" icon="bank-account" isOpen={this.state.isOpen} onClose={this.toggle} title="Créer une cagnotte">
          <div className={Classes.DIALOG_BODY}>
            <Text>Nom de la cagnotte</Text>
            <InputGroup large="true" style={{ marginTop: '10px' }} onKeyPress={this.handleKeyPress} onChange={this.handleChange} placeholder="Pot de départ disruptif" value={this.state.value}/>
          </div>
          <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
              <Button onClick={this.toggle}>Annuler</Button>
              <Button intent={Intent.PRIMARY} onClick={this.handleSubmit} loading={this.state.loading}> Valider</Button>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }

}

export default CreerCagnotte;
