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
		this.handleSort = this.handleSort.bind(this);
		this.handlePageNumber = this.handlePageNumber.bind(this);

		this.state = {
			wines: [],
			selectedWine: null,
			show: false,
			topOfPage: true,
			currPage: 10,
			currRange: '!A1:O10',
			filterParam: null,
		};

		this.getSheetsData(this.state.currRange);
	}

	handlePageNumber() {
		let loadWines = this.state.currPage + 5;
		let newRange = '!A1:O' + loadWines.toString();
		this.getSheetsData(newRange);
		this.setState({ currPage: loadWines });
	}

	setWines(wineArray) {
		if (!this.state.filterParam) {
			this.setState({
				wines: wineArray,
				selectedWine: wineArray[1]
			});
		} else {
			let filteredWines = wineArray.filter(wine => wine[3] === this.state.filterParam);
			this.setState({
				wines: filteredWines,
				selectedWine: filteredWines[1]
			});
		}
	}

	getSheetsData(range) {
		const queryRange = range ? range : '';
		const apiKey = Variables().API_KEY;
		const sheetId = Variables().Sheet_Id;
		const dataRange = queryRange;
		const apiV4 = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1${dataRange}?key=${apiKey}`;
		
		axios.get(apiV4)
			.then((response) => {
				// console.log(response);
				const wines = response.data.values;
				console.log(response.data.values);
				this.setWines(wines);
				// this.setState({
				// 	wines: wines,
				// 	selectedWine: wines[1]
				// });
			})
			.catch((error) => {
				console.log(error);
			});
	}

	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}

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

	handleSort(sortBy) {
		console.log(sortBy);
		console.log(this.state.wines);
		this.setState({ filterParam: sortBy });
		this.getSheetsData();
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
							<img src={process.env.PUBLIC_URL + `/images/wine_thumbnails/${this.state.selectedWine[14]}.jpg`} width="120" />
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
	      		onSortSelect={sortParam => this.handleSort(sortParam)}
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
