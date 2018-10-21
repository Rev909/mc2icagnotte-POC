import React, { Component } from 'react';
import {Alert} from 'reactstrap';

import Loading from '../Loading'
import NotFound from '../NotFound'
import ContribuerCagnotte from './ContribuerCagnotte'
import RetirerCagnotte from './RetirerCagnotte'

export class Cagnotte extends React.Component { // eslint-disable-line react/prefer-stateless-function

  state = { dataKey: null };

  componentDidMount() {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.Mc2iCagnotte;
    const dataKey = contract.methods["getCagnotteByID"].cacheCall(this.props.match.params.number);
    this.setState({ dataKey});
  }

  getCagnotteStatus = (props) =>  {
    if (props.value.statut.toString() === "true") {
      return (
        <div>
          <Alert color="success">Cagnotte ouverte</Alert>
          <ContribuerCagnotte/>
        </div>
      );
    }
  };

  isCagnotteOwner = (props) =>  {
    const visitor = this.props.drizzleState.accounts[0];
    if (props.value.owner === visitor) {
      return (
        <div>
          <RetirerCagnotte/>
        </div>
      );
    }
  };

  render() {
    const { Mc2iCagnotte } = this.props.drizzleState.contracts;
    const cagnotte = Mc2iCagnotte.getCagnotteByID[this.state.dataKey];
    console.log(cagnotte)
    if (!cagnotte)
    {
      return <Loading/>
    }
    else if (cagnotte.value.owner === "0x0000000000000000000000000000000000000000") {
      return <NotFound/>
    }
    return (
      <div>
        <h2> Nom = {cagnotte.value.nom}</h2>
        <h3> Montant = {cagnotte.value.montant}</h3>
        <h4> Nombre de contributions = {cagnotte.value.nbreContributions}</h4>
        <div>{this.getCagnotteStatus(cagnotte)}</div>
        <div>{this.isCagnotteOwner(cagnotte)}</div>
      </div>
    );
  }
}

export default Cagnotte;
