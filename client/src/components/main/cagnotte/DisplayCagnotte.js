import React, { Component } from 'react';
import { Card, Button, CardHeader, CardFooter, CardBody,
  CardTitle, CardText, Container, Col, Row } from 'reactstrap'

import Loading from '../Loading'
import ContribuerCagnotte from '../contribution/ContribuerCagnotte'
import RetirerCagnotte from './RetirerCagnotte'
import NotFound from '../NotFound'

/**
* DisplayCagnotte
*/
export class DisplayCagnotte extends Component { // eslint-disable-line react/prefer-stateless-function

  state = { dataKey: null };

  componentDidMount() {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.Mc2iCagnotte;
    const dataKey = contract.methods["getCagnotteByID"].cacheCall(this.props.id);
    this.setState({ dataKey});
  }

  getCagnotteStatus = (props) =>  {
    if (props.value.statut.toString() === "true") {
      return (
        <Button outline color="success" disabled>Ouverte</Button>
      );
      }
      else {
        return (<Button outline color="danger" disabled>Fermée</Button>)
    }
  };

  isCagnotteOwner = (props) =>  {
    const visitor = this.props.drizzleState.accounts[0];
    if (props.value.owner === visitor) {
      return (
        <Col>
          <Row className="justify-content-center">
            <RetirerCagnotte/>
          </Row>
        </Col>
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
      <Container fluid>
      <Row className="justify-content-center">
        <Col lg="9">
          <Row className="title-cagnotte justify-content-center">
            <Col sm="9">
              <h1 className="display-4 text-center">{cagnotte.value.nom}</h1>
            </Col>
          </Row>
          <Row className="justify-content-center align-items-center">
            <Col>
              <Row className="justify-content-center">
                <ContribuerCagnotte />
              </Row>
            </Col>
            {this.isCagnotteOwner(cagnotte)}
          </Row>
          <hr />
          <Row className="title-info justify-content-center">
              <h2>Informations de la cagnotte</h2> 
          </Row>
          <Row className="infos2-cagnotte justify-content-center align-items-center">
              <Col sm="3">
                <Row className="justify-content-center"><h2>{cagnotte.value.montant}</h2></Row>
                <Row className="justify-content-center"><h3>ETH</h3></Row>
              </Col>
              <Col sm="3">
                <Row className="justify-content-center"><h2>{cagnotte.value.nbreContributions}</h2></Row>
                <Row className="justify-content-center"><h3>contributions</h3></Row>
              </Col>
              <Col sm="3">
                <Row className="justify-content-center">{this.getCagnotteStatus(cagnotte)}</Row>
              </Col>
          </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}


export default DisplayCagnotte;
