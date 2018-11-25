import React, { Component } from 'react';
import { Row, Col } from 'reactstrap'

import { Button, Card, Elevation, Icon, Intent } from "@blueprintjs/core";


import Loading from '../Loading'

export class Contribution extends Component {
	
	state = { dataKey: null };

  	componentDidMount() {
	    const { drizzle, drizzleState } = this.props;
	    const contract = drizzle.contracts.Mc2iCagnotte;
	    const dataKey = contract.methods["getContributionByID"].cacheCall(this.props.id);
	    this.setState({dataKey});
  	}

	render() {
		const { Mc2iCagnotte } = this.props.drizzleState.contracts;
    	const contribution = Mc2iCagnotte.getContributionByID[this.state.dataKey];
    	if (!contribution)
	    {
	      return <Loading />
	    }
		return (
			<Card elevation={Elevation.TWO}>
				<Row className="contribution">
					<Col className="align-self-center" xs="4">
						<Icon icon="user" intent={Intent.PRIMARY} iconSize={70} />
					</Col>
					<Col xs="8">
						<h5>{contribution.value.nom}</h5>
			    		<p className="text-muted">{contribution.value.mot}</p>
			    		<p><strong>{this.props.drizzle.web3.utils.fromWei(contribution.value.montant,"ether")} mc²icoins</strong></p>
					</Col>
				</Row>
			</Card>
		);
	}
}

export default Contribution;