import React, { Component } from 'react';
import axios from 'axios';
import WineList from './components/wine_list';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = { wines: [] };

		this.getSheetsData();
	}

	getSheetsData() {
		const sheetId = '1HsWe9WKMlxfcpZJHyp_Tf15oGoolIP1cLEpISpvlEKY';
		const urlJson = `https://spreadsheets.google.com/feeds/list/${sheetId}/od6/public/basic?alt=json`;
		// const apiV4 = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1`;
		// const urlCsv = `https://docs.google.com/spreadsheets/d/e/${sheetId}/pub?output=csv`;
		
		axios.get(urlJson)
			.then((response) => {
				const wines = response.data.feed.entry;
				console.log(wines);
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

