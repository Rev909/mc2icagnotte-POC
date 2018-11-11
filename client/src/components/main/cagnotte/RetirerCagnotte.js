import React, { Component } from 'react';
import { Button, Intent } from "@blueprintjs/core";

/**
 * ComponentName
 */
export class RetirerCagnotte extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Button id="PopoverCagnotte" large intent={Intent.DANGER} icon="import" onClick={this.toggle}>
          Retirer
       </Button>
    );
  }
}

export default RetirerCagnotte;
