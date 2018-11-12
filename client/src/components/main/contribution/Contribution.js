import React, { Component } from 'react';
import { Card, CardHeader, CardFooter, CardBody,
  CardTitle, CardSubtitle, CardText} from 'reactstrap'


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
		<Card>
			<CardHeader tag="h4">{contribution.value.nom}</CardHeader>
	        <CardBody>
	          <CardSubtitle>{contribution.value.montant}</CardSubtitle>
	          <CardText>{contribution.value.mot}</CardText>
	        </CardBody>
	      </Card>
		);
	}
}

export default Contribution;