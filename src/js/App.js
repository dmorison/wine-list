import React, { Component } from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import Variables from './utils/variables';
// import DataHandle from './utils/data_handle';
import WineList from './components/wine_list';
import MainHeader from './components/main_header';
import SideMenu from './components/side_menu';
// import WineDetail from './components/wine_detail';

class App extends Component {

	constructor(props) {
		super(props);

		this.handleScroll = this.handleScroll.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleShow = this.handleShow.bind(this);
		this.handlePageNumber = this.handlePageNumber.bind(this);
		this.handleFilter = this.handleFilter.bind(this);
		this.handleSort = this.handleSort.bind(this);
		this.handleRating = this.handleRating.bind(this);

		this.state = {
			wines: [],
			selectedWine: null,
			show: false,
			topOfPage: true,
			currPage: 20,
			initRange: '!A1:O20',
			totalWines: 0,
			inStockWines: 0,
			hideLoadMore: false,
			sortParams: null,
			numFilters: 0,
			filterParams: {
				stock: {
					catId: 13,
					value: null
				},
				country: {
					catId: 3,
					value: null
				},
				type: {
					catId: 6,
					value: null
				}
			}
		};

		this.getSheetsData(this.state.initRange);
	}

	// // local development start
	// timeoutID;
	// // local development end

	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}

	// handle the page position for sticky top menu
	handleScroll(event) {
		if (window.pageYOffset || document.body.scrollTop > 1) {
			this.setState({ topOfPage: false });
		} else {
			this.setState({ topOfPage: true });
		}
	}

	handleClose() {
		this.setState({ show: false });
	}

	handleShow(wine) {
		this.setState({
			selectedWine: wine,
			show: true
		});
	}

	handlePageNumber() {
		let loadWines = this.state.currPage + 8;
		let newRange = '!A1:O' + loadWines.toString();
		this.setState({ currPage: loadWines }, () => this.getSheetsData(newRange));
		if (loadWines >= this.state.totalWines) {
			this.setState({ hideLoadMore: true });
		}
	}

	// set what wines to show on app state
	setWines(wineArray) {
		if (this.state.numFilters === 0) {

			let sortWineArray;
			if (this.state.sortParams) {
				sortWineArray = this.sortWines(this.state.sortParams, wineArray);
			} else {
				sortWineArray = wineArray;
			}
			
			this.setState({
				wines: sortWineArray,
				selectedWine: sortWineArray[0]
			}); // local development added function

		} else {
			
			let filteredWines = [];
			let appFilterParams = this.state.filterParams;

			Object.keys(appFilterParams).forEach(key => {
				if (appFilterParams[key].value) {
					if (filteredWines.length < 1) {

						if (key === "stock") {
							if (appFilterParams[key].value === "true") {
								filteredWines = wineArray.filter(wine => wine[appFilterParams[key].catId] > 0);
							} else {
								filteredWines = wineArray.filter(wine => wine[appFilterParams[key].catId] < 1);
							}
						} else {
							filteredWines = wineArray.filter(wine => wine[appFilterParams[key].catId] === appFilterParams[key].value);
						}

					} else {

						filteredWines = filteredWines.filter(wine => wine[appFilterParams[key].catId] === appFilterParams[key].value);
					
					}
				}
			});

			if (this.state.sortParams) {
				filteredWines = this.sortWines(this.state.sortParams, filteredWines);
			}

			this.setState({
				wines: filteredWines,
				selectedWine: filteredWines[0]
			}); // local development added function
		}
	}

	// main API call function
	getSheetsData(range) {
		let queryRange = range ? range : '';
		const apiKey = Variables().API_KEY;
		const sheetId = Variables().Sheet_Id;

		let dataRange;
		if (this.state.numFilters > 0 || this.state.currPage > 20) {
			dataRange = queryRange;
		} else {
			dataRange = this.state.initRange;
		}

		const apiV4 = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1${dataRange}?key=${apiKey}`;
		
		axios.get(apiV4)
			.then((response) => {
				let wines = response.data.values;

				let totals = wines[0];
				let appTotalWines = totals[14];
				let appInStockWines = totals[13];
				this.setState({
					totalWines: appTotalWines,
					inStockWines: appInStockWines
				});

				wines.splice(0, 2);

				this.setWines(wines);
			})
			.catch((error) => {
				console.log(error);
			});

		// // local development start
		// this.timeoutID = window.setTimeout(() => {
		// 	let data = require('./utils/winesheetdata.json');
		// 	let wines = data.values;
		// 	let totals = wines[0];
		// 	wines.splice(0, 2);
		// 	this.setWines(wines);
		// }, 1000);
		// // local development end		
	}

	handleFilter(filterBy) {
		if (!filterBy) {

			console.log("clear filters");
			let appFilterParams = this.state.filterParams;
			
			Object.keys(appFilterParams).forEach(key => {
				appFilterParams[key].value = null;
			});

			this.setState({
				filterParams: appFilterParams,
				numFilters: 0
			}, () => this.getSheetsData());

		} else {

			console.log(filterBy);
			let filterCat = filterBy[0];
			let filterValue = filterBy[1];

			let appFilterParams = this.state.filterParams;
			let numberFilters = this.state.numFilters;

			if (filterValue === "default") {
				appFilterParams[filterCat].value = null;
				numberFilters--;
			} else {
				appFilterParams[filterCat].value = filterValue;
				numberFilters++;
			}

			this.setState({
				filterParams: appFilterParams,
				numFilters: numberFilters
			}, () => this.getSheetsData());

		}
	}

	sortWines(sortBy, wineArray) {
		if (sortBy[0] === 10) {

			switch (sortBy[1]) {
				case 'highLow':
					return wineArray.sort((a, b) => {
						return new Date(b[sortBy[0]]) - new Date(a[sortBy[0]]);
					});
					break;
				case 'lowHigh':
					return wineArray.sort((a, b) => {
						return new Date(a[sortBy[0]]) - new Date(b[sortBy[0]]);
					});
					break;
				default:
					break;
			}

		} else {

			switch (sortBy[1]) {
				case 'highLow':
					return wineArray.sort((a, b) => {
						return b[sortBy[0]] - a[sortBy[0]];
					});
					break;
				case 'lowHigh':
					return wineArray.sort((a, b) => {
						return a[sortBy[0]] - b[sortBy[0]];
					});
					break;
				default:
					break;
			}

		}
	}

	handleSort(sortBy) {
		let sortId = null;
		switch (sortBy[0]) {
			case 'price':
				sortId = 12;
				break;
			case 'date':
				sortId = 10;
				break;
			default:
				break;
		}
		
		let sortDirection = sortBy[1];
		let wineArray = this.sortWines([sortId, sortDirection], this.state.wines);
		
		this.setState({
			sortParams: [sortId, sortDirection],
			wines: wineArray
		});
	}

	handleRating() {
		let rating = this.state.selectedWine[8] ? this.state.selectedWine[8] : null;
		let starIcons;

		if(rating) {
			let halfStart = false;

			if (rating % 1 > 0) {
				halfStart = true;
				rating = rating - 0.5;
			}

			let stars = [];
			for (let i = 1; i <= 5; i++) {
				if (i <= rating) {
					stars.push('true');
				} else if (i > rating && halfStart === true) {
					stars.push('half');
					halfStart = false;
				} else {
					stars.push('false');
				}
			};

			starIcons = stars.map((star, i) => {
					return (<img src={process.env.PUBLIC_URL + `/images/star-${star}.svg`} key={i} alt="" />);
				}
			);
		} else {
			starIcons = <p>Not yet rated</p>
		}

		return (
			<div className="star-rating">
				{starIcons}
			</div>
		);
	}

  render() {
  	let activeWine = null;
  	
  	if (this.state.selectedWine) {

  		let grapes = null;
	  	if (this.state.selectedWine[7] !== '') {
	  		grapes = this.state.selectedWine[7];
	  	} else if (this.state.selectedWine) {
	  		grapes = this.state.selectedWine[6];
	  	}

	  	let country = this.state.selectedWine[3];
	  	country = country.toLowerCase();
	  	country = country.replace(/\s+/g, '');

  		activeWine = (
  			<Modal show={this.state.show} onHide={this.handleClose}>
  				<div className={`map-area type-${this.state.selectedWine[0]} ${country}`}>
  					<a className="sm-button-close" onClick={this.handleClose}>
							<span className="cross-one"></span>
							<span className="cross-two"></span>
						</a>
  				</div>
  				<div className="modal-inner">
  					<div className="modal-inner-head clearfix">
							<img src={process.env.PUBLIC_URL + `/images/wine_thumbnails/${this.state.selectedWine[14]}.png`} alt="wine label" width="120" />
							<div>
								{this.handleRating()}
								<p><strong>Current stock: <span>{this.state.selectedWine[13]}</span></strong></p>
							</div>
						</div>
						
						<h4>{this.state.selectedWine[1]}</h4>
						<h3>{this.state.selectedWine[2]}<br />{this.state.selectedWine[5]}</h3>
						<p><strong>{this.state.selectedWine[4]}, {this.state.selectedWine[3]}</strong></p>
						<p className="margin-bottom">{grapes}</p>
						<p>{this.state.selectedWine[9]}</p>

						<table>
							<tbody>
								<tr>
									<td>Purchased:</td>
									<td>{this.state.selectedWine[11]}</td>
								</tr>
								<tr>
									<td>Price:</td>
									<td>&pound; {this.state.selectedWine[12]}</td>
								</tr>
								<tr>
									<td>Date:</td>
									<td>{this.state.selectedWine[10]}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</Modal>
  		);

  	}

    return (

      <div className="App">
      	<div className="outer-container">
	      	{/*<WineDetail
	      		wine={this.state.selectedWine}
	      		handleModal={this.state.show} />*/}
	      	<SideMenu
	      		pagePosition={this.state.topOfPage}
	      		appTotalWines={this.state.totalWines}
	      		appInStockWines={this.state.inStockWines}
	      		onFilterSelect={filterParam => this.handleFilter(filterParam)}
	      		onSortSelect={sortParam => this.handleSort(sortParam)}
	      	/>
	      	<MainHeader pagePosition={this.state.topOfPage} />
	      	<main className="page-wrap">
		        <WineList
		        	onWineSelect={selectedWine => this.handleShow(selectedWine)}
		        	wines={this.state.wines}
		        />
		        	<button className={`load-more-btn ${this.state.hideLoadMore ? "hide" : ""}`} onClick={this.handlePageNumber}>Load more</button>
		        {/*<button onClick={this.handleClick}>Get Wines</button>*/}
		        {activeWine}
		      </main>
		      <div>Icons made by <a href="https://www.flaticon.com/authors/google" title="Google">Google</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank" rel="noopener noreferrer">CC 3.0 BY</a></div>
	      </div>
      </div>

    );
  }
  
}

export default App;
