import React from 'react';
import Masonry from 'react-masonry-component';
// import {
// 	Grid,
// 	Row
// } from 'react-bootstrap';

import WineItem from './wine_item';

const WineList = (props) => {

	const wineList = props.wines.map((wine, index) => {
		return (
			<WineItem
				onWineSelect={props.onWineSelect}
				key={`${index}_${wine[14]}`}
				wine={wine} />
		);
	});

	return (
		<div className="wine-list">
			<Masonry>
					{wineList}
			</Masonry>
		</div>
	);

}

export default WineList;