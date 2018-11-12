import React from 'react';
import { Navbar, NavbarGroup, NavbarHeading, NavbarDivider, Button, Alignment, NumericInput, Intent } from '@blueprintjs/core'
import { DrizzleContext } from "drizzle-react";
import { Redirect } from 'react-router-dom'

import CreerCagnotte from '../main/cagnotte/CreerCagnotte'

import '../styles/MenuNav.css'

export default class MenuNav extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);

  }

  handleChange(valueAsNumber: number) {
    this.setState({value: valueAsNumber});
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      <Redirect to={'/cagnotte/' + this.state.value} />
    }
  }
  render() {
    return (
      <div className="nav">
        <Navbar fixedToTop>
            <Navbar.Group>
                <Navbar.Heading>
                  <a href="/"  className="main-link-navbar">mc²iCagnotte</a>
                </Navbar.Heading>
                <Navbar.Divider />
                <DrizzleContext.Consumer>
                    {drizzleContext => {
                      const { drizzle, drizzleState, initialized } = drizzleContext;
                      return (
                        <CreerCagnotte drizzle={drizzle} drizzleState={drizzleState} />
                      );
                    }}
                </DrizzleContext.Consumer>
            </Navbar.Group>
            <Navbar.Group align={Alignment.RIGHT}>
                <NumericInput
                  onValueChange={this.handleChange}
                  value={this.state.value}
                  placeholder="Numéro de cagnotte..."
                  onKeyPress={this.handleKeyPress}
                  buttonPosition="none"
                  leftIcon="search"
                  type="search"
                />
                <Button intent="primary" icon="user" text="Profil" style={{ marginLeft: '30px' }} />
            </Navbar.Group>
        </Navbar>
      </div>
    );
  }
}
