import React, { Component } from 'react';

import axios from 'axios';

class App extends Component {
	constructor(props) {
		super(props);
	}

	getSheetsData() {
		const apiKey = 'API_KEY';
		const sheetId = '1Jlj-AtNGT1-12nuvX83KTGSBY7FLMrdSXdySQOGXCm8';
		const apiV4 = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1?key=${apiKey}`;
		// const urlJson = `https://spreadsheets.google.com/feeds/list/${sheetId}/od6/public/basic?alt=json`;
		// const urlCsv = `https://docs.google.com/spreadsheets/d/e/${sheetId}/pub?output=csv`;
		
		axios.get(apiV4)
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
	}

  render() {
  	const myData = this.getSheetsData();

    return (
      <div className="App">

      </div>
    );
  }
}

export default App;
