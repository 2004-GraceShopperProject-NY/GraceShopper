import {expect} from 'chai';
import React from 'react';
import enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {SingleCartItem as UnconnectedSingleCartItem} from './SingleCartItem';
import {priceToDollar} from '../utilities/convertPriceToDollars';

const adapter = new Adapter();
enzyme.configure({adapter});

describe('<SingleCartItem /> component', () => {
  const product = {
    id: 4,
    name: 'Clorox',
    quantity: 100,
    price: '1200',
    imageUrl: 'https://m.media-amazon.com/images/I/81YT7MiwwTL._AC_UL320_.jpg',
    description: 'Helps with disinfecting'
  };

  const cart = {
    '4': 5
  };

  it('renders the product passed in as props', () => {
    const quantity = cart[product.id];
    const wrapper = shallow(
      <UnconnectedSingleCartItem product={product} quantity={quantity} />
    );
    expect(wrapper.text()).to.include('Clorox');

    // it should have an image
    const images = wrapper.find('img').map(node => node.get(0).props.src);
    expect(images).to.include.members([
      'https://m.media-amazon.com/images/I/81YT7MiwwTL._AC_UL320_.jpg'
    ]);

    // it should have an input
    expect(wrapper.find('input')).to.have.length(1);

    // it should render total price correctly
    expect(wrapper.text()).to.include(priceToDollar(product.price * quantity));
  });

  it('renders a DIFFERENT product passed in as props', () => {
    const differentProduct = {
      name: 'First Aid Kit',
      quantity: 100,
      price: '3500',
      imageUrl:
        'https://www.kroger.com/product/images/xlarge/front/0038137117210',
      description: 'Handy dandy first aid kit - path to improved wellness'
    };
    const wrapper = shallow(
      <UnconnectedSingleCartItem
        product={differentProduct}
        quantity={differentProduct.quantity}
      />
    );
    expect(wrapper.text()).to.not.include('Clorox');
    expect(wrapper.text()).to.include('First Aid Kit');
  });
});
