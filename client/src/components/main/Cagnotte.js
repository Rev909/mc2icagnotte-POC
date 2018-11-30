import React, { Component } from 'react';

import Loading from './Loading'
import DisplayCagnotte from './cagnotte/DisplayCagnotte'
import DisplayContribution from './contribution/DisplayContribution'

import { DrizzleContext } from 'drizzle-react'

export class Cagnotte extends Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <DrizzleContext.Consumer>
        {drizzleContext => {
          const { drizzle, drizzleState, initialized } = drizzleContext;

          if (!initialized) {
            return <Loading/>
          }

          return (
            <div className="cagnotte">
              <DisplayCagnotte drizzle={drizzle} drizzleState={drizzleState} id={this.props.match.params.number} /> 
            </div>
          );
        }}
      </DrizzleContext.Consumer>
    );
  }
}

export default Cagnotte;
