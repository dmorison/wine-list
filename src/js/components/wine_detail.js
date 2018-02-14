import React from 'react';

const WineDetail = ({wine}) => {

	if (!wine) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<img src={`./${wine[14]}.png`} width="120" height="120" />
			<ul>
				<li>Type: {wine[0]}</li>
				<li>{wine[1]} - {wine[2]}</li>
				<li>{wine[4]}, {wine[3]}</li>
				<li>{wine[5]}</li>
				<li>{wine[6]}{wine[7] !== 'null' ? ': ' + wine[7] : ''}</li>
				<li>Style: {wine[9]}</li>
				<li>Rating: {wine[8]}</li>
				<li>Purchased from {wine[11]} on {wine[10]}</li>
				<li>Price: {wine[12]}</li>
				<li>Stock: {wine[13]}</li>
			</ul>
		</div>
	);

}

export default WineDetail;