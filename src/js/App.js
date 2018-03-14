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

		this.state = {
			wines: [],
			selectedWine: null,
			show: false
		};

		this.getSheetsData();
	}

	getSheetsData() {
		const apiKey = Variables().API_KEY;
		const sheetId = Variables().Sheet_Id;
		const apiV4 = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1?key=${apiKey}`;
		
		axios.get(apiV4)
			.then((response) => {
				// console.log(response);
				const wines = response.data.values;
				this.setState({
					wines: wines,
					selectedWine: wines[1]
				});
			})
			.catch((error) => {
				console.log(error);
			});
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
  	if (this.state.selectedWine) {
  		activeWine = (
  			<Modal show={this.state.show} onHide={this.handleClose}>
  				<div className={`map-area type-${this.state.selectedWine[0]}`}></div>
  				<div className="modal-inner">
						<img src={process.env.PUBLIC_URL + `/images/wine_thumbnails/${this.state.selectedWine[14]}.jpg`} width="120" />
						<div>
							<h4>{this.state.selectedWine[1]}</h4>
							<h3>{this.state.selectedWine[2]}<br />{this.state.selectedWine[5]}</h3>
						</div>
						
						<ul>
							<li><strong>{this.state.selectedWine[4]}, {this.state.selectedWine[3]}</strong></li>
							<li><strong>{this.state.selectedWine[6]}</strong></li>
							{this.state.selectedWine[7] !== '' ? <li>this.state.selectedWine[7]</li> : null}
							<li>Style: {this.state.selectedWine[9]}</li>
							<li>Rating: {this.state.selectedWine[8]}</li>
							<li>Purchased from {this.state.selectedWine[11]} on {this.state.selectedWine[10]}</li>
							<li>Price: {this.state.selectedWine[12]}</li>
							<li>Stock: {this.state.selectedWine[13]}</li>
						</ul>
						<Button onClick={this.handleClose}>Close</Button>
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
	      	<SideMenu />
	      	<MainHeader />
	      	<main className="page-wrap">
		        <WineList
		        	onWineSelect={selectedWine => this.handleShow(selectedWine)}
		        	wines={this.state.wines} />
		        {/*<button onClick={this.handleClick}>Get Wines</button>*/}
		        {activeWine}
		      </main>
	      </div>
      </div>
    );
  }
  
}

export default App;
