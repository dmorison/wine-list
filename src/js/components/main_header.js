import React, { Component } from 'react';

class MainHeader extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		const sticky = !this.props.pagePosition ? 'sticky' : '';

		return (
			<header>
				<div className="header-bg">
					<div className={`top-bar ${sticky}`}>
						<h1>Wine Cellar</h1>
					</div>
				</div>
			</header>
		);

	}

}

export default MainHeader;