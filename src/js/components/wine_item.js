import React from 'react';

const WineItem = ({wine}) => {
	console.log(wine);
	const wineItem = wine.map((item) => {
		return item;
	});

	return (
		<li>{wineItem}</li>
	);
}

export default WineItem;