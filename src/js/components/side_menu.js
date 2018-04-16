import React, { Component } from 'react';

class SideMenu extends Component {

	constructor(props) {
		super(props);

		this.sideMenuClose = this.sideMenuClose.bind(this);
		this.sideMenuOpen = this.sideMenuOpen.bind(this);
		this.handleFilterSelect = this.handleFilterSelect.bind(this);

		this.state = {
			smOpen: false,
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

	handleFilterSelect(filterBy) {
		let filterObj;
		if (filterBy) {
			filterObj = {
				filterCat: filterBy[0],
				filterItem: filterBy[1]
			}
		} else {
			filterObj = null;
		}

		this.props.onFilterSelect(filterObj);
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
						<p><a onClick={() => this.handleFilterSelect(null)}>CLEAR</a></p>
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
							<li><a onClick={() => this.handleFilterSelect([3, 'South Africa'])}>South Africa</a></li>
							<li><a onClick={() => this.handleFilterSelect([3, 'France'])}>France</a></li>
							<li><a onClick={() => this.handleFilterSelect([3, 'Spain'])}>Spain</a></li>
							<li><a onClick={() => this.handleFilterSelect([3, 'Italy'])}>Italy</a></li>
							<li><a onClick={() => this.handleFilterSelect([3, 'Australia'])}>Australia</a></li>
							<li><a onClick={() => this.handleFilterSelect([3, 'Other'])}>Other</a></li>
						</ul>
						<p><strong>Type:</strong></p>
						<ul>
							<li><a onClick={() => this.handleFilterSelect([6, 'Blend'])}>Blend</a></li>
							<li><a onClick={() => this.handleFilterSelect([6, 'Shiraz'])}>Shiraz</a></li>
							<li><a onClick={() => this.handleFilterSelect([6, 'Syrah'])}>Syrah</a></li>
							<li><a onClick={() => this.handleFilterSelect([6, 'Cabernet Sauvignon'])}>Cabernet Sauvignon</a></li>
							<li><a onClick={() => this.handleFilterSelect([6, 'Merlot'])}>Merlot</a></li>
							<li><a onClick={() => this.handleFilterSelect([6, 'Cabernet Franc'])}>Cabernet Franc</a></li>
							<li><a onClick={() => this.handleFilterSelect([6, 'Malbec'])}>Malbec</a></li>
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