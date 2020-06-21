import {expect} from 'chai';
import React from 'react';
import enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {SingleCartItem as UnconnectedSingleCartItem} from './SingleCartItem';

const adapter = new Adapter();
enzyme.configure({adapter});

describe.only('Single Cart Item', () => {
  describe('<SingleCartItem /> component', () => {
    const product = {
      id: 4,
      name: 'Clorox',
      quantity: 100,
      price: '1200',
      imageUrl:
        'https://m.media-amazon.com/images/I/81YT7MiwwTL._AC_UL320_.jpg',
      description: 'Helps with disinfecting'
    };

    const cart = {'4': 1};

    it('renders the product passed in as props', () => {
      const wrapper = shallow(
        <UnconnectedSingleCartItem
          product={product}
          quantity={cart[product.id]}
        />
      );
      expect(wrapper.text()).to.include('Clorox');
      // it should render price correctly
      expect(wrapper.contains('$12.00')).to.equal(true);
      // it should have an image
      expect(wrapper.find('img')).to.have.length(1);
      // it should have a button
      expect(wrapper.find('Button')).to.have.length(1);
    });

    it('renders a DIFFERENT product passed in as props', () => {
      const differentProduct = {
        name: 'First Aid Kit',
        quantity: 100,
        price: '3500',
        imageUrl:
          'https://www.kroger.com/product/images/xlarge/front/0038137117210',
        description: 'Handy dandy first aid kit - pathto improved wellness'
      };
      const wrapper = shallow(
        <UnconnectedSingleCartItem
          product={differentProduct}
          quantity={differentProduct.quantity}
        />
      );
      expect(wrapper.text()).to.not.include('Clorox');
      expect(wrapper.text()).to.include('First Aid Kit');

      const images = wrapper.find('img').map(node => node.get(0).props.src);
      expect(images).to.include.members([
        'https://www.kroger.com/product/images/xlarge/front/0038137117210'
      ]);
    });
  });
});
