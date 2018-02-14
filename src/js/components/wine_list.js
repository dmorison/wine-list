import React from 'react';
import WineItem from './wine_item';

const WineList = (props) => {

	const wineList = props.wines.map((wine, index) => {
		if (index < 1) { return; }
		return <WineItem wine={wine} />;
	});

	return (
		<div>
			{wineList}
		</div>
	);

}

export default WineList;