import React, { Component } from 'react';

/**
 * NotFound
 */
export class NotFound extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="error">
        <h1>
            Oops!</h1>
        <h2>
            404 Not Found
        </h2>
      </div>
    );
  }
}

export default NotFound;
