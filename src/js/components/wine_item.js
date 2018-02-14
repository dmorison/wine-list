import React from 'react';

const WineItem = ({wine, onWineSelect}) => {
	// console.log(wine);

	return (
		<div>
			<img src={`./${wine[14]}.png`} width="60" height="60" />
			<ul>
				<li>{wine[1]} - {wine[2]}</li>
				<li>{wine[4]}, {wine[3]}</li>
				<li>{wine[5]}</li>
				<li>{wine[6]}</li>
				<li><a href="#" onClick={() => onWineSelect(wine)}>View details</a></li>
			</ul>
		</div>
	);

}

export default WineItem;