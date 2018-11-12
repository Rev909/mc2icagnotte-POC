import React, { Component } from 'react';
import { Container, Col, Row } from 'reactstrap'

import { Callout, Icon, Intent } from "@blueprintjs/core";
import { DrizzleContext } from 'drizzle-react'

import Loading from '../Loading'
import ContribuerCagnotte from '../contribution/ContribuerCagnotte'
import DisplayContribution from '../contribution/DisplayContribution'
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
    this.setState({dataKey});
  }

  getCagnotteStatus = (props) =>  {
    if (props.value.statut.toString() === "true") {
      return (<Callout intent={Intent.SUCCESS} title="Cagnotte ouverte" icon="bank-account"/>);
      }
      else {
        return (<Callout intent={Intent.DANGER} title="Cagnotte fermée" icon="cross"/>)
    }
  };

  getActionsCagnotte = (props) =>  {
    const visitor = this.props.drizzleState.accounts[0];
    if (props.value.statut.toString() === "true") {
          if (props.value.owner === visitor) {
           return (
              <DrizzleContext.Consumer>
                {drizzleContext => {
                  const { drizzle, drizzleState, initialized } = drizzleContext;
                  if (!initialized) { return <Loading />} ;
                  return (
                      <div className="actions-return">
                        <Row className="justify-content-center">
                          <Col sm="6">
                            <ContribuerCagnotte drizzle={drizzle} drizzleState={drizzleState} id={this.props.id} />
                          </Col>
                          <Col sm="6">
                            <RetirerCagnotte drizzle={drizzle} drizzleState={drizzleState} id={this.props.id}/>
                          </Col>
                        </Row>
                      </div>
                  );
                }}
              </DrizzleContext.Consumer>
            );
          }
          else {
            return (
              <DrizzleContext.Consumer>
                {drizzleContext => {
                  const { drizzle, drizzleState, initialized } = drizzleContext;
                  if (!initialized) { return <Loading />} ;
                  return (
                    <div className="actions-return">
                      <Row className="justify-content-center">
                        <Col sm="12">
                          <ContribuerCagnotte drizzle={drizzle} drizzleState={drizzleState} id={this.props.id}/>
                        </Col> 
                      </Row>
                    </div>
                  );
                }}
              </DrizzleContext.Consumer>
              );
          }
    }
    else {
      return  (
          <div className="actions-return">
            <Row className="justify-content-center">
              <Col sm="12">
                <h4 class="text-muted">Aucune action disponible</h4>
               </Col> 
            </Row>
          </div>
        )
    }    

  };

  render() {
    const { Mc2iCagnotte } = this.props.drizzleState.contracts;
    const cagnotte = Mc2iCagnotte.getCagnotteByID[this.state.dataKey];
    if (!cagnotte)
    {
      return <Loading />
    }
    else if (cagnotte.value.owner === "0x0000000000000000000000000000000000000000") {
      return <NotFound />
    }
    return (
      <div className="display-cagnotte">
        <Container>
          <div className="display-infos">  
              <Row>
                <Col lg="8">
                  <div className="title-cagnotte border rounded-left">
                    <div className="heading-title">
                      <h1 className="display-3"> {cagnotte.value.nom} </h1>
                    </div>
                    <div className="sub-title">
                      <h4 className="text-muted"> <small> Créée par {cagnotte.value.owner} </small></h4>
                    </div>
                  </div>
                </Col>
                <Col lg="4">
                  <div className="infos-cagnotte border rounded-right">
                    <div className="montant-cagnotte">
                      <h3> {
                        this.props.drizzle.web3.utils.fromWei(cagnotte.value.montant,"ether")
                      } ETH</h3>
                    </div>
                    <div className="contributions-cagnotte">
                      <h3> {cagnotte.value.nbreContributions}  {cagnotte.value.nbreContributions > 1 ? 'contributions' : 'contribution'}</h3>
                    </div>
                    <div className="statut-cagnotte">
                      <div className="statut-return">
                        {this.getCagnotteStatus(cagnotte)}
                      </div>
                    </div>
                  </div>
                  <div className="actions-cagnotte">
                    {this.getActionsCagnotte(cagnotte)}
                  </div>
                </Col>
              </Row> 
          </div>
          <div className="display-contributions">
            <div className="title-contributions">
              <h1 className="bp3-heading">Contributions</h1>
            </div>
            { cagnotte.value.nbreContributions == 0 ? "Aucune contribution à cette cagnotte" : <DisplayContribution drizzle={this.props.drizzle} drizzleState={this.props.drizzleState} id={this.props.id} /> }
          </div>
        </Container>
      </div>
    )
  }
}


export default DisplayCagnotte;
