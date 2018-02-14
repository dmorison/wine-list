import React, { Component } from 'react';
import axios from 'axios';
import Variables from './utils/variables';
// import DataHandle from './utils/data_handle';
import WineList from './components/wine_list';

class App extends Component {

	constructor(props) {
		super(props);

		this.state = { wines: [] };

		// this.handleClick = this.handleClick.bind(this);
		this.getSheetsData();
	}

	getSheetsData() {
		const apiKey = Variables().API_KEY;
		const sheetId = Variables().Sheet_Id;
		const apiV4 = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1?key=${apiKey}`;
		
		axios.get(apiV4)
			.then((response) => {
				console.log(response);
				const wines = response.data.values;
				this.setState({ wines });
			})
			.catch((error) => {
				console.log(error);
			});
	}

	// handleClick() {
	// 	console.log('handleClick');
	// 	this.setState({ wines: DataHandle().wines });
	// }

  render() {
    return (
      <div className="App">
        <WineList wines={this.state.wines} />
        {/*<button onClick={this.handleClick}>Get Wines</button>*/}
      </div>
    );
  }
  
}

export default App;
