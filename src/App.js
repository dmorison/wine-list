import React, { Component } from 'react';
import axios from 'axios';
import Variables from './variables';
import WineList from './components/wine_list';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = { wines: [] };

		this.getSheetsData();
	}

	getSheetsData() {
		const apiKey = Variables().API_KEY;
		const sheetId = '1HsWe9WKMlxfcpZJHyp_Tf15oGoolIP1cLEpISpvlEKY';
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

  render() {
    return (
      <div className="App">
        <WineList wines={this.state.wines} />
      </div>
    );
  }
}

export default App;
