import React, { Component } from 'react'
import { Jumbotron, Container, Card, Button, CardTitle, CardText, CardDeck, CardSubtitle, CardBody } from 'reactstrap';

class Accueil extends React.Component {
  render() {
    return (
      <div className="jumbotron">
        <Jumbotron fluid>
          <Container fluid>
            <CardDeck>
              <Card>
                <CardBody>
                  <CardTitle>Card title</CardTitle>
                  <CardSubtitle>Card subtitle</CardSubtitle>
                  <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                  <Button>Button</Button>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <CardTitle>Card title</CardTitle>
                  <CardSubtitle>Card subtitle</CardSubtitle>
                  <CardText>This card has supporting text below as a natural lead-in to additional content.</CardText>
                  <Button>Button</Button>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <CardTitle>Card title</CardTitle>
                  <CardSubtitle>Card subtitle</CardSubtitle>
                  <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</CardText>
                  <Button>Button</Button>
                </CardBody>
              </Card>
            </CardDeck>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}

export default Accueil
