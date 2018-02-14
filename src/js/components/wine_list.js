import React from 'react';
import WineItem from './wine_item';

const WineList = (props) => {
	console.log('in WineList');
	console.log(props);

	if (!props) {
		return;
	}
	
	const wineList = props.wines.map((wine) => {
		return <WineItem wine={wine} />
	});

	return (
		<ul>
			{wineList}
		</ul>
	);
}

export default WineList;