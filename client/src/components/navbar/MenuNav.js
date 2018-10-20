import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button
} from 'reactstrap';
import { DrizzleContext } from "drizzle-react";

import CreerCagnotte from '../main/CreerCagnotte'

import '../styles/MenuNav.css'

export default class MenuNav extends React.Component {

  render() {
    return (
      <div className="nav">
        <Navbar color="light" className="shadow-sm" light fixed="top" expand="md">
          <NavbarBrand href="/">mc²iCagnotte</NavbarBrand>
            <Nav className="mr-auto" pills>
              <NavItem>
                <DrizzleContext.Consumer>
                  {drizzleContext => {
                    const { drizzle, drizzleState, initialized } = drizzleContext;
                    return (
                      <CreerCagnotte drizzle={drizzle} drizzleState={drizzleState} />
                    );
                  }}
                </DrizzleContext.Consumer>
              </NavItem>
              <NavItem>
                <NavLink href="/cagnotte/3">Accéder à une cagnotte</NavLink>
              </NavItem>
              <NavItem>
                <NavLink>Mes cagnottes</NavLink>
              </NavItem>
              <NavItem>
                <NavLink>Mes contributions</NavLink>
              </NavItem>
            </Nav>
            <Button outline expand="ml-3" color="primary">Mon profil</Button>{' '}
        </Navbar>
      </div>
    );
  }
}
