import React, { Component } from 'react';
import { Card, Button, CardHeader, CardFooter, CardBody,
  CardTitle, CardText, Container, Col, Row } from 'reactstrap'

/**
 * DisplayContribution
 */
export class DisplayContribution extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="display-contribution">
      	<Container>
      		<Row className="justify-content-center">
      			<Col lg="12">
      				<h1> Contributions </h1>
      			</Col>
      		</Row>
      	</Container>
      </div>
    );
  }
}

export default DisplayContribution;
