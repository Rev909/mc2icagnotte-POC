import React, { Component } from 'react';
import Web3 from "web3"

import Cagnotte from './components/main/Cagnotte'
import MenuNav from './components/navbar/MenuNav'
import Accueil from './components/main/Accueil'
import NotFound from './components/main/NotFound'
import Footer from './components/navbar/Footer'
import Web3NotInstanciated from './components/main/Web3NotInstanciated'

import { Route, Switch } from 'react-router-dom'

class App extends Component {

  state = { loading: true };

  render() {

  if (typeof web3 == 'undefined') {
    return (
        <Web3NotInstanciated/>
    );
  }
  
  return (
      <div className='App'>
        <MenuNav />
        <Switch>
          <Route exact path="/" component={Accueil}/>
          <Route path="/cagnotte/:number" component={Cagnotte} />
          <Route path="*" component={NotFound} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
