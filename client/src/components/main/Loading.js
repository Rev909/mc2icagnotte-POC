import React, { Component } from 'react';
import {Container, Col, Row} from 'reactstrap';


import trefle from '../styles/images/trefle.png'
import '../styles/Loading.css'

/**
* ComponentName
*/
export class Loading extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="loading">
        <Container fluid>
          <Row className="align-items-center">
            <Col className="contrefle align-self-center"><img className="trefle" src={trefle} alt="Trefle mc²i" /></Col>
            <Col className="align-self-center"><h3>Chargement</h3></Col>
          </Row>
        </Container>

      </div>
    );
  }
}

export default Loading;
