import React from 'react';
import { Navbar, Button, Alignment, InputGroup, Intent } from '@blueprintjs/core'
import { DrizzleContext } from "drizzle-react";
import { withRouter } from 'react-router-dom'

import CreerCagnotte from '../main/cagnotte/CreerCagnotte'

import '../styles/MenuNav.css'

export class MenuNav extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value: '',
      validvalue: false,
      disabledInput: false,
      redirect: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(event) {
    this.setState({val1ue: event.target.value});

    if (isNaN(this.state.value)) {
      this.setState({validvalue: true});
    }
    else {
      this.setState({validvalue: false});
    }
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      if (!isNaN(this.state.value)) {
        this.props.history.push('/cagnotte/' + this.state.value);
      }
    }
  }

  handleSubmit(event) {
    if (this.state.value === '') {
      this.setState({validvalue: true});
    }
    else { this.props.history.push('/cagnotte/' + this.state.value); }
  }

  render() {
    const searchButton = (
       <Button
          disabled={this.state.validvalue}
          icon="search"
          intent={Intent.PRIMARY}
          minimal={true}
          onClick={this.handleSubmit}
        />
    );

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
                      let loading = false
                
                      if (!initialized) { 
                        loading = true 
                      }

                      return (
                        <CreerCagnotte drizzle={drizzle} drizzleState={drizzleState} loading={loading} history={this.props.history}/>
                      );
                    }}
                </DrizzleContext.Consumer>
            </Navbar.Group>
            <Navbar.Group align={Alignment.RIGHT}>
                <InputGroup
                  onChange={this.handleChange}
                  value={this.state.value}
                  placeholder="Numéro de cagnotte..."
                  intent={this.state.validvalue ? Intent.DANGER : Intent.NONE}
                  onKeyPress={this.handleKeyPress}
                  disabled={this.state.disabledInput}
                  rightElement={searchButton}
                  type="search"
                />
                <Button intent="primary" icon="user" text="Profil" style={{ marginLeft: '30px' }} />
            </Navbar.Group>
        </Navbar>
      </div>
    );
  }
}

export default withRouter(MenuNav)