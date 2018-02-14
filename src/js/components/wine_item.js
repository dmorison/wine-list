import React from 'react';

const WineItem = ({wine}) => {
	// console.log(wine);

	return (
		<ul>
			<li>{wine[0]}</li>
			<li>{wine[1]}</li>
			<li>{wine[2]}</li>
			<li>{wine[3]}</li>
		</ul>
	);

}

export default WineItem;