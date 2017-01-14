import {h, Component} from 'preact';
import axios from 'axios';

class Product extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      url: '',
      img: '',
      price: '',
    };
  }

  componentWillMount() {
    const self = this;
    axios.get(this.props.url)
      .then(({ data }) => {
        self.setState({
          name: data.name,
          url: "!/p/" + data.id,
          dataurl: "!/p/" + data.id,
          img: data.thumbnailUrl,
          price: Ecwid.formatCurrency(data.price),
        });
      });
  }

  render() {
    const cln = `recently-viewed recently-viewed--${this.props.id}`;
    return (
      <div className={cln}>
        <a className="recently-viewed__url" data-url={this.state.dataurl} href={this.state.url} onClick={this.onClick}>
          <div className="recently-viewed__thumb">
            <img alt="" src={this.state.img} />
          </div>
          <div className="recently-viewed__name">{this.state.name}</div>
          <div className="recently-viewed__price ecwid-productBrowser-price">
            {this.state.price}
          </div>
        </a>
      </div>
    );
  }

  onClick(e) {
    e.preventDefault();
    e.stopPropagation();
    if (typeof Wix === 'undefined') {
      window.location = window.location.origin + "/#" + e.currentTarget.dataset.url;
    } else {
      Wix.pushState(e.currentTarget.dataset.url);
    }
  }
}

export default Product;
