import {h, Component } from 'preact';
import Product from './Product';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rvp: this.props.items,
    };

    this.addProduct = this.addProduct.bind(this);
    const self = this;
    Ecwid.OnPageLoad.add((page) => {
      if (page.type === 'PRODUCT') {
        const pId = page.productId;
        self.addProduct(pId);
      }
    });
  }

  addProduct(product) {
    const newViewed = this.state.rvp.filter(i => i !== product);
    newViewed.unshift(product);
    this.setState({ rvp: newViewed.slice(0, this.props.maximum) });
    sessionStorage.setItem('viewed', JSON.stringify(this.state.rvp));
  }

  render() {
    let title = 'Recently Viewed Products';
    if (this.props.settings.lang === 'ru') {
      title = 'Недавно просмотренные товары';
    } else if (this.props.settings.lang === 'sv') {
      title = 'Nyligen visade produkter';
    }
    return (
      <div id="rvp-products-wrapper" className={(this.state.rvp.slice(1).length) ? 'rvp-wrapper' : 'rvp-wrapper--empty'}>
        <div className="recently-viewed-title">{title}</div>
        <div id="recently-viewed-list">
          {this.state.rvp.slice(1).map(item =>
            <Product
              key={item}
              url={`https://app.ecwid.com/api/v3/${this.props.settings.storeId}/products/${item}?token=${this.props.settings.token}`}
              id={item}
            />)}
        </div>
      </div>
    );
  }

}

export default App;
