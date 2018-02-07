import React from 'react';

const WineItem = ({wine}) => {
	const wineObj = {
		estate: '',
		name: '',
		country: '',
		region: '',
		year: '',
		variety: '',
		grapes: '',
		rating: 0,
		style: '',
		date: '',
		purchased: '',
		price: 0,
		stock: 0,
		image: ''
	};
	const myWine = wine.content.$t.split(',');
	// console.log(myWine);

	myWine.map((wine) => {
		const thisWine = wine.split(':');
		wineObj[thisWine[0].trim()] = thisWine[1].trim();
	});
	// console.log(wineObj);

	// 	const wineProps = Object.keys(wineObj).forEach((key) => {
	// 		console.log(key + ': ' + wineObj[key]);
	// 		return `<li>${key} ${wineObj[key]}</li>`;
	// 	});

	return (
		<ul>
			<li>Estate: {wineObj.estate}</li>
			<li>Name: {wineObj.name}</li>
			<li>Country: {wineObj.country}</li>
			<li>Region: {wineObj.region}</li>
			<li>Year: {wineObj.year}</li>
			<li>Variety: {wineObj.variety}</li>
			<li>Grapes: {wineObj.graps}</li>
			<li>Rating: {wineObj.rating}</li>
			<li>Style: {wineObj.style}</li>
			<li>Date: {wineObj.date}</li>
			<li>Purchased: {wineObj.purchased}</li>
			<li>Price: {wineObj.price}</li>
			<li>Stock: {wineObj.stock}</li>
			<li>Image: {wineObj.image}</li>
		</ul>
	);
}

export default WineItem;