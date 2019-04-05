import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';

import registerServiceWorker from './registerServiceWorker';

// import drizzle functions and contract artifact
import { Drizzle, generateStore } from "drizzle";
import { DrizzleContext } from "drizzle-react";
import Mc2iCagnotte from "./contracts/Mc2iCagnotte.json";

// let drizzle know what contracts we want
const options = { 
	contracts: [Mc2iCagnotte],
	events: {
    	Mc2iCagnotte: ['CreationCagnotte'],
	}
};

// setup the drizzle store and drizzle
const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);

ReactDOM.render(
  <DrizzleContext.Provider drizzle={drizzle}>
    <BrowserRouter forceRefresh={true}>
      <App /> 
    </BrowserRouter>
  </DrizzleContext.Provider>,
  document.getElementById("root")
);

registerServiceWorker();
