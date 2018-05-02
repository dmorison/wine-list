import React, { Component } from 'react';

class SideMenu extends Component {

	constructor(props) {
		super(props);

		this.sideMenuClose = this.sideMenuClose.bind(this);
		this.sideMenuOpen = this.sideMenuOpen.bind(this);
		this.initFilter = this.initFilter.bind(this);
		this.initSort = this.initSort.bind(this);

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

	initSort(event) {
		let sortParams = event.target.value.split('_');
		this.props.onSortSelect(sortParams);
	}

	initFilter(event) {
		if (event.target.id === "clear-filters") {
			this.props.onFilterSelect(null);
		} else {
			this.props.onFilterSelect([event.target.id, event.target.value]);			
		}
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

						<p className="margin-bottom">Total wines: {this.props.appTotalWines}</p>
						<p className="margin-bottom">Currently in stock: {this.props.appInStockWines}</p>

						<form>
							<p className="margin-bottom"><strong>Sort</strong></p>
							<div className="sort-block">
								<p><strong>Price:</strong></p>
								<label className="sort-label" htmlFor="price_highLow">
									<input type="radio" name="sort-wines" id="price_highLow" value="price_highLow" onChange={this.initSort} />High to low
								</label>
								<label className="sort-label" htmlFor="price_lowHigh">
									<input type="radio" name="sort-wines" id="price_lowHigh" value="price_lowHigh" onChange={this.initSort} />Low to high
								</label>
							</div>
							
							<div className="sort-block">
								<p><strong>Date added:</strong></p>
								<label className="sort-label" htmlFor="date_highLow">
									<input type="radio" name="sort-wines" id="date_highLow" value="date_highLow" onChange={this.initSort} />Newest to oldest
								</label>
								<label className="sort-label" htmlFor="date_lowHigh">
									<input type="radio" name="sort-wines" id="date_lowHigh" value="date_lowHigh" onChange={this.initSort} />Oldest to Newest
								</label>
							</div>
							
							<p className="margin-bottom"><strong>Filter</strong></p>
							
							<label>
								Stock:
								<select id="stock" onChange={this.initFilter}>
									<option value="default">Select stock option</option>
									<option value="true">In stock</option>
									<option value="false">Out of stock</option>
								</select>
								{/*<i className="fas fa-chevron-down fa-lg"></i>*/}
							</label>
							
							<label>
								Country:
								<select id="country" onChange={this.initFilter}>
									<option value="default">Select a country</option>
									<option value="South Africa">South Africa</option>
									<option value="France">France</option>
									<option value="Spain">Spain</option>
									<option value="Italy">Italy</option>
									<option value="Australia">Australia</option>
									{/*<option value="Other">Other</option>*/}
								</select>
								{/*<i className="fas fa-chevron-down fa-lg"></i>*/}
							</label>
							
							<label>
								Type:
								<select id="type" onChange={this.initFilter}>
									<option value="default">Select a type</option>
									<option value="Blend">Blend</option>
									<option value="Shiraz">Shiraz</option>
									<option value="Syrah">Syrah</option>
									<option value="Cabernet Sauvignon">Cabernet Sauvignon</option>
									<option value="Merlot">Merlot</option>
									<option value="Cabernet Franc">Cabernet Franc</option>
									<option value="Malbec">Malbec</option>
								</select>
								{/*<i className="fas fa-chevron-down fa-lg"></i>*/}
							</label>

							<button className="sm-form-btn" id="clear-filters" onClick={this.initFilter}>Clear Filters</button>
						</form>

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