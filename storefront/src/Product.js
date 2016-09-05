import React, { Component } from 'react'
import {token, apiProductUrl, storeId} from './index'

//const token = 'public_j4W4SHTxTg2eSkVphEqNsJwSpwz9vVfi' //Ecwid.getAppPublicToken('testapp-hackathon2016-3')

class Product extends Component {
	state = {
		name: '',
		url: '',
		img: '',
		price: ''
	}

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		console.log(this)
	}

	componentDidMount() {
		const self = this
		fetch(`${apiProductUrl}/${storeId}/products/${this.props.id}?token=${token}`)
			.then(function (response) {
				return response.json()
			}).then(function (json) {
				self.setState({
					name: json.name,
					url: window.location.origin + window.location.pathname + '#'+json.url.split('#')[1],
					img: json.thumbnailUrl,
					price: json.price
				})
			}).catch(function (ex) {
		     console.warn('parsing failed', ex)
			})
	}

  render() {
		let cln = `recently-viewed recently-viewed--${this.props.id}`
    return (
      <div className={cln}>
				<a className="recently-viewed__url" href={this.state.url}><div data-role="thumb" className="recently-viewed__thumb"><img src={this.state.img} /></div><div className="recently-viewed__name">{this.state.name}</div><div className="recently-viewed__price ecwid-productBrowser-price">{this.state.price}</div></a>
      </div>
    );
  }
}

export default Product;
