import React, { Component } from 'react';

import { Container, Row, Col } from 'reactstrap';

import metamask from '../styles/images/metamask-button.png'

class Web3NotInstanciated extends Component {
	render() {
		return (
			<div className="web3-notfound">
				<Container>
					<Row>
						<Col>
							<h1 className="bp3-heading text-center">Metamask n'est pas installé :( </h1>
							<p className="text-center">Metamask est une extension de navigateur internet, recommandé par l'équipe, vous permettant de gérer vos actifs
								mc²icoins, de créer et de contribuer aux cagnottes. Cliquez sur le bouton ci-dessous pour accéder au site :
							</p>
							<a href="https://metamask.io/" className="text-center"><img className="metamask" src={metamask} alt="Bouton de téléchargement Metamask" /></a>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}

export default Web3NotInstanciated;