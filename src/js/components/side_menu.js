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
		const sticky = !this.props.pagePosition ? 'sticky' : '';

		return (
			<div className={`side-menu ${openMenu}`}>
				<div className="sm-overlay" onClick={this.sideMenuClose}></div>
				<div className="menu-wrap">
					<div className="sm-menu">
						<a className="sm-button-close" onClick={this.sideMenuClose}>
							<span className="cross-one"></span>
							<span className="cross-two"></span>
						</a>
						<br />
						<p className="margin-bottom"><strong>Sort</strong></p>
						<p><strong>Price:</strong></p>
						<ul>
							<li><a onClick={() => this.props.onSortSelect('highlow')}>High to low</a></li>
							<li><a>Low to high</a></li>
						</ul>
						<p><strong>Added:</strong></p>
						<ul className="last-ul">
							<li><a>Oldest to newest</a></li>
							<li><a>Newest to oldestt</a></li>
						</ul>
						<p className="margin-bottom"><strong>Filter</strong></p>
						<p><strong>Country:</strong></p>
						<ul>
							<li><a onClick={() => this.props.onSortSelect('South Africa')}>South Africa</a></li>
							<li><a>France</a></li>
							<li><a>Spain</a></li>
							<li><a>Italy</a></li>
							<li><a>Australia</a></li>
							<li><a>Other</a></li>
						</ul>
						<p><strong>Type:</strong></p>
						<ul>
							<li><a>Blend</a></li>
							<li><a>Shiraz</a></li>
							<li><a>Cabernet Sauvignon</a></li>
							<li><a>Merlot</a></li>
							<li><a>Cabernet franc</a></li>
							<li><a>Malbec</a></li>
						</ul>
					</div>
				</div>
				<div className={`sm-button-open ${sticky}`} onClick={this.sideMenuOpen}>
					<span></span>
					<span></span>
					<span></span>
				</div>
			</div>
		);
	}

}

export default SideMenu;