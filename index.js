import React from 'react'
import { render } from 'react-dom'

export class ProductItem extends React.Component {
	static defaultProps = {
		productId: ''
	}
	state = {
		product: {}
	}

	componentWillMount() {
		this.getProduct(this.props.productId)
	}

	render() {
		return(
			<a className="recently-viewed__url" href={this.state.product.url}>
				<div className="recently-viewed__thumb">
					<img src={this.state.product.thumbnailUrl} alt="" />
				</div>
				<div className="recently-viewed__name">{this.state.product.name}</div>
				<div className="recently-viewed__price">{this.state.product.price}</div>
			</a>
		)
	}

	getProduct(item) {
		const token = 'secret_VP5zXwrzPa8niU5mcm1whdZFLbCq6ZEV'
		const apiProductUrl = 'https://app.ecwid.com/api/v3'
		const self = this

		fetch(`${apiProductUrl}/7022058/products/${item}?token=${token}`)
			.then(function (response) {
				return response.json()
			}).then(function (json) {
				self.setState({product: json})
		}).catch(function (ex) {
			console.warn('parsing failed', ex)
		})
	}
}

export class RecentProducts extends React.Component {
	constructor(props) {
		super(props);
		this.state = {viewed: this.props.viewed}
		this.addRecentProduct = this.addRecentProduct.bind(this);
	}

	static defaultProps = {
		maxShown: 5,
		container: '.ecwid-productBrowser',
		viewed: [49734740,49734739]
	}
	static propTypes = {
		maxShown: React.PropTypes.number.isRequired,
		container: React.PropTypes.string.isRequired,
		viewed: React.PropTypes.array.isRequired
	}
	// state = {
	// 	viewed: this.props.viewed
	// }

	render() {
		return (
			<div>
				{this.state.viewed.map((i)=>this.renderItem(i))}
			</div>
		)
	}

	renderItem(id) {
		return (
			<ProductItem key={id} productId={id} />
		)
	}

	addRecentProduct(id) {
		let newViewed = this.state.viewed.filter((i)=> {
			return i !== id
		})
		newViewed.unshift(id)
		if ( newViewed.length > this.props.maxShown ) {
			newViewed.pop()
		}
		this.setState({viewed: newViewed})
	}
}

let rootElement = document.getElementById('app')
render( <div> <RecentProducts /></div>, rootElement)