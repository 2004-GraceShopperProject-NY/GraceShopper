import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import enzyme, {shallow} from 'enzyme';
import {AllProducts as UnconnectedAllProducts} from './AllProducts';
import {expect} from 'chai';
import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';

const adapter = new Adapter();
enzyme.configure({adapter});

describe.only('<AllProducts /> component', () => {
  const allProducts = [
    {
      id: 1,
      name: 'Catan',
      quantity: 40,
      price: '5500',
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/81%2Bokm4IpfL._AC_SX425_.jpg'
    },
    {
      id: 2,
      name: 'Water',
      quantity: 500,
      price: '1000',
      imageUrl:
        'https://cdn.shopify.com/s/files/1/0051/7262/5477/products/1000ml-illuminated-sleeve-2x-new_c44257a2-91c3-4946-b2de-80deb6eb9a14_900x900.png?v=1570045978'
    }
  ];

  describe('AllProducts items', () => {
    it('renders the products passed in as props', () => {
      const wrapper = shallow(
        <UnconnectedAllProducts
          products={allProducts}
          allProducts={() => {}}
          userLoggedIn={{role: 'customer'}}
        />
      );

      expect(wrapper.text()).to.include('Catan');
      expect(wrapper.text()).to.include('Water');

      const images = wrapper
        .find('img')
        .map(product => product.get(0).props.src);

      expect(images).to.include.members([
        'https://images-na.ssl-images-amazon.com/images/I/81%2Bokm4IpfL._AC_SX425_.jpg',
        'https://cdn.shopify.com/s/files/1/0051/7262/5477/products/1000ml-illuminated-sleeve-2x-new_c44257a2-91c3-4946-b2de-80deb6eb9a14_900x900.png?v=1570045978'
      ]);
    });

    it('renders the different products passed in as props', () => {
      const differentProducts = [
        {
          id: '3',
          name: 'mask',
          price: '1200',
          imageUrl:
            'https://ihealthlabs.com/wp-content/uploads/livocare_mask_50_main.jpg'
        },
        {
          id: '4',
          name: 'hand sanitizer',
          price: '750',
          imageUrl:
            'https://assets.fishersci.com/TFS-Assets/CCG/Gojo-Industries-Inc/product-images/9651-24.jpg-650.jpg'
        }
      ];

      const wrapper = shallow(
        <UnconnectedAllProducts
          products={differentProducts}
          allProducts={() => {}}
          userLoggedIn={{role: 'customer'}}
        />
      );
      expect(wrapper.text()).to.not.include('Catan');
      expect(wrapper.text()).to.not.include('Water');
      expect(wrapper.text()).to.include('mask');
      expect(wrapper.text()).to.include('hand sanitizer');

      const images = wrapper
        .find('img')
        .map(product => product.get(0).props.src);

      expect(images).to.include.members([
        'https://ihealthlabs.com/wp-content/uploads/livocare_mask_50_main.jpg',
        'https://assets.fishersci.com/TFS-Assets/CCG/Gojo-Industries-Inc/product-images/9651-24.jpg-650.jpg'
      ]);
    });
  });

  describe('AllProducts render text', () => {
    it('should show title text', () => {
      const props = {
        allProducts: () => {},
        addToCartThunk: () => {},
        userLoggedIn: {role: 'customer'},
        products: []
      };
      const wrapper = shallow(<UnconnectedAllProducts {...props} />);
      const title = wrapper.find('.title-all-products');
      expect(title.text()).to.equal('What are you looking for today?');
    });

    it('should find Link in allproducts component', () => {
      const props = {
        allProducts: () => {},
        addToCartThunk: () => {},
        userLoggedIn: {role: 'customer'},
        products: [
          {
            id: '1',
            name: 'mask',
            price: '1200',
            imageUrl:
              'https://ihealthlabs.com/wp-content/uploads/livocare_mask_50_main.jpg'
          }
        ]
      };
      const wrapper = shallow(<UnconnectedAllProducts {...props} />);
      const product = wrapper.find(Link);
      expect(product.length).to.equal(1);
    });

    it('should find button in allproducts component', () => {
      const props = {
        allProducts: () => {},
        addToCartThunk: () => {},
        userLoggedIn: {role: 'customer'},
        products: [
          {
            id: '1',
            name: 'hand sanitizer',
            price: '750',
            imageUrl:
              'https://assets.fishersci.com/TFS-Assets/CCG/Gojo-Industries-Inc/product-images/9651-24.jpg-650.jpg'
          }
        ]
      };
      const wrapper = shallow(<UnconnectedAllProducts {...props} />);
      const product = wrapper.find(Button);
      expect(product.length).to.equal(1);
    });
  });
});
