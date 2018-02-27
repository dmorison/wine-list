import React, { Component } from 'react';
import 
	{ 
		Navbar,
		Nav,
		NavItem,
		Glyphicon
	} from 'react-bootstrap';

class TopNavbar extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Navbar fixedTop>
				<Navbar.Header>
					<Navbar.Brand>
						<a href="#">Wine Cellar</a>
					</Navbar.Brand>
				</Navbar.Header>
				<Nav pullRight>
					<NavItem>
						<Glyphicon glyph="menu-hamburger" />
					</NavItem>
				</Nav>
			</Navbar>
		);
	}

}

export default TopNavbar;