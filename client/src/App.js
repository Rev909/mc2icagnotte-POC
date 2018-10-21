import React, { Component } from 'react';

import CreerCagnotte from './components/main/CreerCagnotte'
import Cagnotte from './components/main/cagnotte/Cagnotte'
import MenuNav from './components/navbar/MenuNav'
import Accueil from './components/main/Accueil'
import NotFound from './components/main/NotFound'

import {BrowserRouter, Router, Route, Switch} from 'react-router-dom'
import { DrizzleContext } from "drizzle-react";

class App extends Component {

  state = { loading: true };

  componentDidMount() {
    const { drizzle } = this.props;
  }

  compomentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <div className='App'>
        <MenuNav />
        <Switch>
          <Route exact path="/" component={Accueil}/>
          <DrizzleContext.Consumer>
            {drizzleContext => {
              const { drizzle, drizzleState, initialized } = drizzleContext;
              if (initialized) {
                return (
                  <Route exact path="/cagnotte/:number" render={(props) => <Cagnotte {...props} drizzle={drizzle} drizzleState={drizzleState} />} />
                );
              }
            }}
            </DrizzleContext.Consumer>
        </Switch>
      </div>
    );
  }
}

export default App;
