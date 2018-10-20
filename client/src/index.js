import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';
import CreerCagnotte from './components/main/CreerCagnotte'
import Accueil from './components/main/Accueil'
import Cagnotte from './components/main/Cagnotte'

import registerServiceWorker from './registerServiceWorker';

// import drizzle functions and contract artifact
import { Drizzle, generateStore } from "drizzle";
import { DrizzleContext } from "drizzle-react";
import Mc2iCagnotte from "./contracts/Mc2iCagnotte.json";

// let drizzle know what contracts we want
const options = { contracts: [Mc2iCagnotte] };

// setup the drizzle store and drizzle
const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);

ReactDOM.render(
  <DrizzleContext.Provider drizzle={drizzle}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </DrizzleContext.Provider>,
  document.getElementById("root")
);

registerServiceWorker();
