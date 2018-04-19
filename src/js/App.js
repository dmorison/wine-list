import React, { Component } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import Variables from './utils/variables';
// import DataHandle from './utils/data_handle';
import WineList from './components/wine_list';
import MainHeader from './components/main_header';
import SideMenu from './components/side_menu';
// import WineDetail from './components/wine_detail';

class App extends Component {

	constructor(props) {
		super(props);

		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleScroll = this.handleScroll.bind(this);
		this.handleFilter = this.handleFilter.bind(this);
		this.handlePageNumber = this.handlePageNumber.bind(this);

		this.state = {
			wines: [],
			selectedWine: null,
			show: false,
			topOfPage: true,
			currPage: 10,
			currRange: '!A1:O10',
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

		this.getSheetsData(this.state.currRange);
	}

	handlePageNumber() {
		let loadWines = this.state.currPage + 5;
		let newRange = '!A1:O' + loadWines.toString();
		this.getSheetsData(newRange);
		this.setState({ currPage: loadWines });
	}

	// set what wines to show on app state
	setWines(wineArray) {
		if (this.state.numFilters === 0) {
			console.log("there are no filters set");
			this.setState({
				wines: wineArray,
				selectedWine: wineArray[0]
			});
		} else {
			console.log(wineArray);
			let filteredWines = [];
			let appFilterParams = this.state.filterParams;
			Object.keys(appFilterParams).forEach(key => {
				if (appFilterParams[key].value) {
					console.log(key);
					console.log(appFilterParams[key].catId);
					console.log(appFilterParams[key].value);
					if (filteredWines.length < 1) {
						if (key === "stock") {
							if (appFilterParams[key].value === "true") {
								filteredWines = wineArray.filter(wine => wine[appFilterParams[key].catId] > 0);
							} else {
								filteredWines = wineArray.filter(wine => wine[appFilterParams[key].catId] === 0);
							}
						} else {
							filteredWines = wineArray.filter(wine => wine[appFilterParams[key].catId] === appFilterParams[key].value);
						}
					} else {
						filteredWines = filteredWines.filter(wine => wine[appFilterParams[key].catId] === appFilterParams[key].value);
					}
				}
			});
			console.log(filteredWines);

			this.setState({
				wines: filteredWines,
				selectedWine: filteredWines[0]
			});
		}
	}

	// main API call function
	getSheetsData(range) {
		let queryRange = range ? range : '';
		const apiKey = Variables().API_KEY;
		const sheetId = Variables().Sheet_Id;
		let dataRange;
		if (this.state.numFilters > 0) {
			dataRange = queryRange;
		} else {
			dataRange = this.state.currRange;
		}
		const apiV4 = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1${dataRange}?key=${apiKey}`;
		
		axios.get(apiV4)
			.then((response) => {
				let wines = response.data.values;
				let totals = wines[0];
				console.log(totals);
				wines.splice(0, 2);
				this.setWines(wines);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	handleFilter(filterBy) {
		if (!filterBy) {
			let appFilterParams = this.state.filterParams;
			Object.keys(appFilterParams).forEach(key => {
				console.log(key);
				console.log(appFilterParams[key]);
				appFilterParams[key].value = null;
			});

			console.log(appFilterParams);
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
			console.log(numberFilters);
			console.log(appFilterParams);

			this.setState({
				filterParams: appFilterParams,
				numFilters: numberFilters
			}, () => this.getSheetsData());
		}
	}

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

  render() {
  	let activeWine = null;
  	let grapes = null;

  	if (this.state.selectedWine && this.state.selectedWine[7] !== '') {
  		grapes = this.state.selectedWine[7];
  	} else if (this.state.selectedWine) {
  		grapes = this.state.selectedWine[6];
  	}

  	if (this.state.selectedWine) {
  		activeWine = (
  			<Modal show={this.state.show} onHide={this.handleClose}>
  				<div className={`map-area type-${this.state.selectedWine[0]}`}>
  					<a className="sm-button-close" onClick={this.handleClose}>
							<span className="cross-one"></span>
							<span className="cross-two"></span>
						</a>
  				</div>
  				<div className="modal-inner">
  					<div className="modal-inner-head clearfix">
							<img src={process.env.PUBLIC_URL + `/images/wine_thumbnails/${this.state.selectedWine[14]}.png`} width="120" />
							<div>
								<p><strong>Rating: <span>{this.state.selectedWine[8]}</span></strong></p>
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
									<td>{this.state.selectedWine[12]}</td>
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
	      		onFilterSelect={filterParam => this.handleFilter(filterParam)}
	      	/>
	      	<MainHeader pagePosition={this.state.topOfPage} />
	      	<main className="page-wrap">
		        <WineList
		        	onWineSelect={selectedWine => this.handleShow(selectedWine)}
		        	wines={this.state.wines}
		        />
		        	<button className="load-more-btn" onClick={this.handlePageNumber}>Load more</button>
		        {/*<button onClick={this.handleClick}>Get Wines</button>*/}
		        {activeWine}
		      </main>
	      </div>
      </div>
    );
  }
  
}

export default App;
