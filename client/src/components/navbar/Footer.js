import React, { Component } from 'react';
import {Container, Row, Col} from 'reactstrap';
import { Icon, Intent } from "@blueprintjs/core";

export class Footer extends Component {
	render() {
		return (
			<footer className="footer">
				<Row>
					<Col>
	        			<p className="text-center text-muted">Made with <Icon icon="heart" intent={Intent.DANGER} /> in 51 rue François 1er</p> 
	        		</Col>
	        	</Row>
    		</footer>	
		);
	}
}

export default Footer;