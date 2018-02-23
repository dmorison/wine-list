import React, { Component } from 'react';
import axios from 'axios';
import Variables from './utils/variables';
// import DataHandle from './utils/data_handle';
import WineList from './components/wine_list';
import WineDetail from './components/wine_detail';

class App extends Component {

	constructor(props) {
		super(props);

		this.handleSelectedWine = this.handleSelectedWine.bind(this);

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

	handleSelectedWine(wine) {
		this.setState({
			selectedWine: wine,
			show: true
		});
	}

  render() {
    return (
      <div className="App">
      	<WineDetail
      		wine={this.state.selectedWine}
      		handleModal={this.state.show} />
        <WineList
        	onWineSelect={selectedWine => this.handleSelectedWine(selectedWine)}
        	wines={this.state.wines} />
        {/*<button onClick={this.handleClick}>Get Wines</button>*/}
      </div>
    );
  }
  
}

export default App;
