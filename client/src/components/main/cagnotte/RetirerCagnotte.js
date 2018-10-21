import React, { Component } from 'react';
import {  Button } from 'reactstrap';

/**
 * ComponentName
 */
export class RetirerCagnotte extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Button color="danger">Retirer Cagnotte</Button>
    );
  }
}

export default RetirerCagnotte;
