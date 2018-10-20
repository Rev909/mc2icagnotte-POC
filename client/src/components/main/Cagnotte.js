import React, { Component } from 'react';
import {Alert} from 'reactstrap';

import Loading from './Loading'

export class Cagnotte extends React.Component { // eslint-disable-line react/prefer-stateless-function

  state = { dataKey: null };

  componentDidMount() {
    const { drizzle } = this.props;

    console.log(drizzle);
    const contract = drizzle.contracts.Mc2iCagnotte;

    console.log(contract);
    const dataKey = contract.methods["getCagnotteByID"].cacheCall(this.props.match.params.number);
    this.setState({ dataKey });
  }

  getCagnotteStatus = (props) =>  {
    if (props.value.statut.toString() === "true") {
      return <Alert color="success">Cagnotte ouverte</Alert>
    }
  };

  render() {
    const { Mc2iCagnotte } = this.props.drizzleState.contracts;
    const cagnotte = Mc2iCagnotte.getCagnotteByID[this.state.dataKey];
    console.log(cagnotte);
    if (!cagnotte)
    {
      return <Loading/>
    }
    return (
      <div>
        <h2> Nom = {cagnotte.value.nom}</h2>
        <h3> Montant = {cagnotte.value.montant}</h3>
        <h4> Nombre de contributions = {cagnotte.value.nbreContributions}</h4>
        <div>{this.getCagnotteStatus(cagnotte)}</div>
      </div>
    );
  }
}

export default Cagnotte;
