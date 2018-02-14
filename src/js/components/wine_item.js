import React from 'react';

const WineItem = ({wine}) => {
	const wineItem = wine.map((item) => {
		return item;
	});

	return (
		<ul>
			<li>{wineItem[0]}</li>
			<li>{wineItem[1]}</li>
			<li>{wineItem[2]}</li>
			<li>{wineItem[3]}</li>
		</ul>
	);

}

export default WineItem;