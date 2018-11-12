import React, { Component } from 'react';
import { CardColumns } from 'reactstrap'

import Loading from '../Loading'
import Contribution from './Contribution'

/**
 * DisplayContribution
 */
export class DisplayContribution extends Component { // eslint-disable-line react/prefer-stateless-function
  
	state = { dataKey: null };

	componentDidMount() {
	    const { drizzle, drizzleState } = this.props;
	    const contract = drizzle.contracts.Mc2iCagnotte;
	    const dataKey = contract.methods["getContributionsByCagnotte"].cacheCall(this.props.id);
	    this.setState({dataKey});
  	}

  render() {
    const { Mc2iCagnotte } = this.props.drizzleState.contracts;
    const contributions = Mc2iCagnotte.getContributionsByCagnotte[this.state.dataKey];

    if (!contributions) {
    	return <Loading />
    }

    let contributionsList = []
    for (let i = 0 ; i < contributions.value.length ; i++) {
    	contributionsList.push(<Contribution drizzle={this.props.drizzle} drizzleState={this.props.drizzleState} key={i} id={contributions.value[i]}  />)
    }

    return (
	    <CardColumns>
	      {contributionsList}
	    </CardColumns>
    );
  }
}

export default DisplayContribution;
