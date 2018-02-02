import React, { Component } from 'react';

import axios from 'axios';

class App extends Component {
	getSheetsData() {
		const key = '2PACX-1vSt81EPodQlmjR3hMJkqB1cr2MFODU8rzemtqAR_OfqIUT2szHemzPOKyziRyuDYt1TYdmND2BoTrmL';
		const urlJson = `https://spreadsheets.google.com/feeds/list/${key}/od6/public/basic?hl=en_US&alt=json`;
		const urlCsv = `https://docs.google.com/spreadsheets/d/e/${key}/pub?output=csv`;
		
		axios.get(urlJson)
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
