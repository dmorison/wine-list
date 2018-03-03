import React, { Component } from 'react';

class SideMenu extends Component {

	constructor(props) {
		super(props);

		this.sideMenuClose = this.sideMenuClose.bind(this);
		this.sideMenuOpen = this.sideMenuOpen.bind(this);

		this.state = {
			smOpen: false
		}
	}

	sideMenuClose() {
		this.setState({ smOpen: false });
		document.body.style.overflow = null;
	}

	sideMenuOpen() {
		this.setState({ smOpen: true });
		document.body.style.overflow = "hidden";
	}

	render() {
		const openMenu = this.state.smOpen ? 'sm-open' : '';

		return (
			<div className={`side-menu ${openMenu}`}>
				<div className="sm-overlay" onClick={this.sideMenuClose}></div>
				<div className="menu-wrap">
					<div className="sm-menu">
						<a onClick={this.sideMenuClose}>close</a>
						<br /><br />
						<p>The dog and the cat</p><br /><br />
						<p>The dog and the cat</p><br /><br />
						<p>The dog and the cat</p><br /><br />
						<p>The dog and the cat</p><br /><br />
						<p>The dog and the cat</p><br /><br />
						<p>The dog and the cat</p><br /><br />
						<p>The dog and the cat</p><br /><br />
						<p>The dog and the cat</p><br /><br />
						<p>The dog and the cat</p><br /><br />
						<p>The dog and the cat</p><br /><br />
						<p>The dog and the cat</p><br /><br />
						<p>The dog and the cat</p><br /><br />
						<p>The dog and the cat</p><br /><br />
						<p>The dog and the cat</p><br /><br />
						<p>The dog and the cat</p><br /><br />
					</div>
				</div>
				<div className="sm-button"><a onClick={this.sideMenuOpen}>open</a></div>
			</div>
		);
	}

}

export default SideMenu;