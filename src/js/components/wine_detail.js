import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class WineDetail extends Component {

	constructor(props) {
		super(props);
		
		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
		
		this.state = {
			show: false
		}
	}

	handleClose() {
		this.setState({ show: false });
	}

	handleShow() {
		this.setState({ show: true });
	}

	render() {

		const {wine} = this.props;

		if (!wine) {
			return null;
		}

		return (
			<Modal show={this.state.show} onHide={this.handleClose}>
				<img src={`./${wine[14]}.png`} width="120" height="120" />
				<ul>
					<li>Type: {wine[0]}</li>
					<li>{wine[1]} - {wine[2]}</li>
					<li>{wine[4]}, {wine[3]}</li>
					<li>{wine[5]}</li>
					<li>{wine[6]}{wine[7] !== 'null' ? ': ' + wine[7] : ''}</li>
					<li>Style: {wine[9]}</li>
					<li>Rating: {wine[8]}</li>
					<li>Purchased from {wine[11]} on {wine[10]}</li>
					<li>Price: {wine[12]}</li>
					<li>Stock: {wine[13]}</li>
				</ul>
				<Button onClick={this.handleClose}>Close</Button>
			</Modal>
		);
	}

}

export default WineDetail;