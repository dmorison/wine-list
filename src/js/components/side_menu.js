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
						<a className="sm-button-close" onClick={this.sideMenuClose}>
							<span className="cross-one"></span>
							<span className="cross-two"></span>
						</a>
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
				<div className="sm-button-open" onClick={this.sideMenuOpen}>
					<span></span>
					<span></span>
					<span></span>
				</div>
			</div>
		);
	}

}

export default SideMenu;