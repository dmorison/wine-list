import React from 'react';
// import { Col } from 'react-bootstrap';

const WineItem = ({wine, onWineSelect}) => {
	// console.log(wine);

	return (
		<div className="wine-item">
			<a onClick={() => onWineSelect(wine)}>
				<div className={`thumbnail type-${wine[0]}`}>
					<div className="caption">
						<p>{wine[1]}</p>
						<h3>{wine[2]}<br/>{wine[5]}</h3>
					</div>
					<img className="thumbnail-img" src={process.env.PUBLIC_URL + `/images/wine_thumbnails/${wine[14]}.png`} />
					<div className="caption">
						<p>{wine[4]}<br/>{wine[3]}</p>
						<p>{wine[6]}</p>
					</div>
				</div>
			</a>
		</div>
	);

}

export default WineItem;