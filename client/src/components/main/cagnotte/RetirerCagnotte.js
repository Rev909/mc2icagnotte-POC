import React, { Component } from 'react';
import { Button, Classes, Dialog, Intent, Text } from "@blueprintjs/core";
import { Redirect } from 'react-router-dom'

/**
 * ComponentName
 */
export class RetirerCagnotte extends Component { // eslint-disable-line react/prefer-stateless-function

	 constructor(props) {
	    super(props);
	    this.state = {
	      isOpen: false,
	      stackId: null,
	      loading: false,
	    };

	    this.toggle = this.toggle.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);

	}

	toggle() {
    	this.setState({
	      isOpen: !this.state.isOpen,
	      stackId: null,
	      loading: false,
	    });
  	}

  	handleSubmit(event) {
	    const { drizzle, drizzleState } = this.props;
	    const contract = drizzle.contracts.Mc2iCagnotte;
	    const stackId = contract.methods["RetirerCagnotte"].cacheSend(this.props.id);
	    this.setState({stackId: stackId, loading: true});
  	}


	render() {
		if (this.state.stackId) {
			const contract = this.props.drizzle.contracts.Mc2iCagnotte;
		    const { transactions, transactionStack } = this.props.drizzleState;
		    const txHash = transactionStack[this.state.stackId];
		    if (txHash) {
		        if (transactions[txHash].status === 'success') {
		        	this.toggle();
		        	return <Redirect to={'/cagnotte/' + this.props.id} />
		        }
		    }
		}

		return (
			<div>
				<Button id="PopoverCagnotte" large intent={Intent.DANGER} icon="import" onClick={this.toggle}>
				Retirer
				</Button>
				<Dialog className="dialog-cagnotte" icon="error" isOpen={this.state.isOpen} onClose={this.toggle} title="Retrait de la cagnotte">
					<div className={Classes.DIALOG_BODY}>
						<Text>Retirer la cagnotte fermera défintivement celle-ci, il ne sera plus possible d'y contribuer. Etes-vous sûr ?</Text>
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

export default RetirerCagnotte;
