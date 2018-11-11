import React, { Component } from 'react'
import {Container, Row, Col, Jumbotron, CardTitle, CardDeck, CardImg, CardSubtitle, CardBody, CardText, Card, Button } from 'reactstrap';

class Accueil extends React.Component {
  render() {
    return (
      <div className="accueil">
        <Container>
          <Jumbotron>
              <h1 className="display-3">Bienvenue sur mc²iCagnotte</h1>
              <p className="lead">mc²iCagnotte est un site internet de cagnottes en ligne reposant sur la technologie blockchain Ethereum.</p>
          </Jumbotron>
          <Row>
            <Col sm="12">
              <div className="text-heading">
                <h1 className="bp3-heading text-center">Comment cela fonctionne-t-il ?</h1>
              </div>
              <CardDeck className="accueil-faq">
                <Card>
                  <CardBody>
                    <CardTitle>Card title</CardTitle>
                    <CardSubtitle>Card subtitle</CardSubtitle>
                    <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                  </CardBody>
                </Card>
                <Card>
                  
                  <CardBody>
                    <CardTitle>Card title</CardTitle>
                    <CardSubtitle>Card subtitle</CardSubtitle>
                    <CardText>This card has supporting text below as a natural lead-in to additional content.</CardText>
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <CardTitle>Card title</CardTitle>
                    <CardSubtitle>Card subtitle</CardSubtitle>
                    <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</CardText>
                  </CardBody>
                </Card>
              </CardDeck>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Accueil
