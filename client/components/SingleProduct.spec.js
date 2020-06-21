import {expect} from 'chai';
import React from 'react';
import enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {SingleProduct} from './SingleProduct';

const adapter = new Adapter();
enzyme.configure({adapter});

// describe('<SingleProduct />', () => {
//   // const product = shallow(<SingleProduct name={product.name} price={product.price} />
//   // );

//   it('should have a bootstrap button', function () {
//     const wrapper = shallow(<SingleProduct match={{params: {id: 0}}} product={{name: "Mask", price: 1.99, quantity: 100, id: 0}}/>);
//     expect(wrapper.find('Col')).to.have.length(2);
//   });

//   it('should have a bootstrap column', function () {
//     const wrapper = shallow(<SingleProduct/>);
//     expect(wrapper.find('Button')).to.have.length(1);
//   });

//   it('should have an image to display the product', function () {
//     const wrapper = shallow(<SingleProduct/>);
//     expect(wrapper.find('img')).to.have.length(1);
//   });

//   it('should have input for quantity', function () {
//     const wrapper = shallow(<SingleProduct/>);
//     expect(wrapper.find('input')).to.have.length(1);
//   });

//   it('renders the price in a div', () => {
//     expect(SingleProduct.find('div').text()).to.be.equal('Price')
//   })

//   it('calls componentDidMount', () => {
//     shallow(<SingleProduct/>);
//     expect(SingleProduct.prototype.componentDidMount).to.have.property('callCount', 1);
//   });
// })
