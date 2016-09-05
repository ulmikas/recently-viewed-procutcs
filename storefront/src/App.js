import React, { Component } from 'react';
import Product from './Product.js';

class App extends Component {
	static defaultProps = {
		items: [],
		maximum: 5
	}

	state = {
		rvp: this.props.items
	}

	constructor(props) {
		super(props)
		this.addProduct = this.addProduct.bind(this)
		const self = this
		Ecwid.OnPageLoad.add(function(page) {
			if ( page.type === 'PRODUCT' ) {
				let pId = page.productId
				self.addProduct(pId)
			}
		})
	}
	componentDidMount() {
	}

  render() {
    return (
			<div id="rvp-products-wrapper">
				<div id="recently-viewed-list" data-role="rvp-list">
				{this.state.rvp.map((item, i)=>{ if (i) return <Product key={item} id={item} /> })}
				</div>
			</div>
    );
  }

	addProduct(product) {
		let newViewed = this.state.rvp.filter((i) => {
			return i !== product
		})
		newViewed.unshift(product)
		if ( newViewed.length > this.props.maximum ) {
			newViewed.pop()
		}
		localStorage.setItem('viewed', JSON.stringify(newViewed))
		this.setState({rvp: newViewed})
	}
}

export default App;
