import React, { PureComponent } from 'react';
import { Button, Classes, Dialog, Intent, Text, InputGroup, Position, Toast, Toaster } from '@blueprintjs/core';
import { Redirect, withRouter } from 'react-router-dom'


class CreerCagnotte extends PureComponent  {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      stackId: '',
      value: '',
      count: 0,
      loading: false,
      id: '', 
      toasts: [ 
        {
            action: {
                loading: true
            },
            intent: Intent.PRIMARY,
            message: 'Cagnotte en cours de création...',
            timeout: 0
        },
        {
            icon: "tick",
            intent: Intent.SUCCESS,
            message: "Cagnotte créée avec succès !",
            timeout: 2000
        },
        {
            icon: 'cross',
            intent: Intent.DANGER,
            message: 'Erreur de création, veuillez réessayer :(',
            timeout: 3000
        }
      ]
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
      loading: false,
      count: 0
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
    const stackId = contract.methods['CreerCagnotte'].cacheSend(this.state.value)
    this.setState({stackId: stackId, isOpen: false, loading: true }); 
  }

  getIDCagnotte = () => {
    const { transactions, transactionStack } = this.props.drizzleState;
    const txHash = transactionStack[this.state.stackId];
    if (txHash) {
      if (transactions[txHash].status === 'success') {
        this.toaster.clear();
        this.addToast(this.state.toasts[1]);
        return transactions[txHash].receipt.events.CreationCagnotte.returnValues[0];
      }
      else if (transactions[txHash].status === 'pending') {
        if (this.state.count === 0) {
          this.addToast(this.state.toasts[0]);
          this.setState((state, props) => ({ count: state.count + 1}));
        }
      }

      else if (transactions[txHash].status === 'error') {
        this.addToast(this.state.toasts[2]);
        this.toggle();
      }
      else (
        console.log(transactions[txHash].error)
      )
    }
  }

  addToast(toast: IToastProps) {
        this.toaster.show(toast);
  }

  refHandlers = {
        toaster: (ref: Toaster) => (this.toaster = ref),
  };

  
  render() {
    if (this.state.stackId.toString() !== '') {
      const cagnotte_ID = this.getIDCagnotte();
      if (cagnotte_ID ) {
        this.props.history.push('/cagnotte/' + cagnotte_ID );
      }
    }

    return (
      <div>
        <Button minimal='true' icon='plus' onClick={this.toggle} loading={this.props.loading} text='Créer une cagnotte' />
        <Toaster position={Position.TOP} ref={this.refHandlers.toaster} />
        <Dialog className='dialog-cagnotte' icon='bank-account' isOpen={this.state.isOpen} onClose={this.toggle} title='Créer une cagnotte'>
          <div className={Classes.DIALOG_BODY}>
            <Text>Nom de la cagnotte</Text>
            <InputGroup large='true' style={{ marginTop: '10px' }} onKeyPress={this.handleKeyPress} onChange={this.handleChange} placeholder='Pot de départ disruptif' value={this.state.value}/>
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
