import React, { Component } from 'react';

class MainHeader extends Component {

	constructor(props) {
		super(props);

		this.handleScroll = this.handleScroll.bind(this);

		this.state = {
			topOfPage: true
		}
	}

	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}

	handleScroll(event) {
		if (window.pageYOffset || document.body.scrollTop > 1) {
			this.setState({ topOfPage: false });
		} else {
			this.setState({ topOfPage: true });
		}
	}

	render() {
		const sticky = !this.state.topOfPage ? 'sticky' : '';

		return (
			<header>
				<div className={`top-bar ${sticky}`}>
					<h1>Wine Cellar</h1>
				</div>
			</header>
		);

	}

}

export default MainHeader;