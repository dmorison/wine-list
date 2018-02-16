import axios from "axios";

import Variables from "./variables";

// const DataHandle = () => {


// 	async const getWine = () => {
// 		const apiKey = Variables().API_KEY;
// 		const sheetId = Variables().Sheet_Id;
// 		const apiV4 = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1?key=${apiKey}`;

// 		let wines = [];

// 		await const wines = axios.get(apiV4)
// 			// .then((response) => {
// 			// 	wines = response.data.values;
// 			// 	console.log(wines);
// 			// })
// 			// .catch((error) => {
// 			// 	console.log(error);
// 			// });

// 		return wines;
// 	};

// 	return {
// 		wines: getWine()
// 	};

// }


function getWine() {
	const apiKey = Variables().API_KEY;
	const sheetId = Variables().Sheet_Id;
	const apiV4 = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1?key=${apiKey}`;


	return axios.get(apiV4);
		// .then((response) => {
		// 	wines = response.data.values;
		// 	console.log(wines);
		// })
		// .catch((error) => {
		// 	console.log(error);
		// });


	// return wines;
};

export default getWine;