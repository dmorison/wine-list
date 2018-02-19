import React from 'react';
import { Col } from 'react-bootstrap';

const WineItem = ({wine, onWineSelect}) => {
	// console.log(wine);

	return (
		<Col className="wine-item" xs={12} sm={6} md={3}>
			<img src={`./${wine[14]}.png`} width="60" height="60" />
			<ul>
				<li>{wine[1]} - {wine[2]}</li>
				<li>{wine[4]}, {wine[3]}</li>
				<li>{wine[5]}</li>
				<li>{wine[6]}</li>
				<li><a href="#" onClick={() => onWineSelect(wine)}>View details</a></li>
			</ul>
		</Col>
	);

}

export default WineItem;