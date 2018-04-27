import React, { Component } from 'react';

class SideMenu extends Component {

	constructor(props) {
		super(props);

		this.sideMenuClose = this.sideMenuClose.bind(this);
		this.sideMenuOpen = this.sideMenuOpen.bind(this);
		this.handleFilterSelect = this.handleFilterSelect.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSort = this.handleSort.bind(this);

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

	handleSort(event) {
		let sortArray = event.target.value.split('_');
		this.props.onSortSelect(sortArray);
	}

	handleChange(event) {
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
						<form>
							<p className="margin-bottom"><strong>Sort</strong></p>
							<p><strong>Price:</strong></p>
							<label htmlFor="price_highLow">
								<input type="radio" name="sort-wines" id="price_highLow" value="price_highLow" onChange={this.handleSort} />High to low
							</label>
							<label htmlFor="price_lowHigh">
								<input type="radio" name="sort-wines" id="price_lowHigh" value="price_lowHigh" onChange={this.handleSort} />Low to high
							</label>
							{/*<ul>
								<li><a onClick={() => this.props.onSortSelect('highlow')}>High to low</a></li>
								<li><a>Low to high</a></li>
							</ul>*/}
							{/*<p><strong>Added:</strong></p>
							<label htmlFor="added_highLow">
								<input type="radio" name="sort-wines" id="added_highLow" value="date_highLow" onChange={this.handleSort} />Newest to oldest
							</label>
							<label htmlFor="added_lowHigh">
								<input type="radio" name="sort-wines" id="added_lowHigh" value="date_lowHigh" onChange={this.handleSort} />Oldest to Newest
							</label>*/}
							{/*<ul className="last-ul">
								<li><a>Oldest to newest</a></li>
								<li><a>Newest to oldestt</a></li>
							</ul>*/}
							<p className="margin-bottom"><strong>Filter</strong></p>
							<button className="sm-form-btn" id="clear-filters" onClick={this.handleChange}>Clear Filters</button>
							<label>
								Stock:
								<select id="stock" onChange={this.handleChange}>
									<option value="default">Select stock option</option>
									<option value="true">In stock</option>
									<option value="false">Out of stock</option>
								</select>
							</label>
							<label>
								Country:
								<select id="country" onChange={this.handleChange}>
									<option value="default">Select a country</option>
									<option value="South Africa">South Africa</option>
									<option value="France">France</option>
									<option value="Spain">Spain</option>
									<option value="Italy">Italy</option>
									<option value="Australia">Australia</option>
									<option value="Other">Other</option>
								</select>
							</label>
							
							<label>
								Type:
								<select id="type" onChange={this.handleChange}>
									<option value="default">Select a type</option>
									<option value="Blend">Blend</option>
									<option value="Shiraz">Shiraz</option>
									<option value="Syrah">Syrah</option>
									<option value="Cabernet Sauvignon">Cabernet Sauvignon</option>
									<option value="Merlot">Merlot</option>
									<option value="Cabernet Franc">Cabernet Franc</option>
									<option value="Malbec">Malbec</option>
								</select>
							</label>
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