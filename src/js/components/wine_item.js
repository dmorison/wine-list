import React from 'react';
import { Col } from 'react-bootstrap';

const WineItem = ({wine, onWineSelect}) => {
	console.log(wine);

	return (
		<Col className="wine-item" xs={12} sm={6} md={3}>
			<a href="#" onClick={() => onWineSelect(wine)}>
				<div className="thumbnail">
					<div className="caption">
						<p>{wine[1]}</p>
						<h3>{wine[2]}<br/>{wine[5]}</h3>
					</div>
					<img className={`thumbnail-img item-${wine[0]}`} src={process.env.PUBLIC_URL + `/images/wine_thumbnails/${wine[14]}.jpg`} width="70" />
					<div className="caption">
						<p>{wine[4]}<br/>{wine[3]}</p>
						<p>{wine[6]}</p>
					</div>
				</div>
			</a>
		</Col>
	);

}

export default WineItem;