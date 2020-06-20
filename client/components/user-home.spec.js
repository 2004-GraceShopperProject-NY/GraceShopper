/* global describe beforeEach it */

import {expect} from 'chai';
import React from 'react';
import enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {UserHome} from './user-home';

const adapter = new Adapter();
enzyme.configure({adapter});

describe('UserHome', () => {
  it('renders <UserHome /> component', () => {
    const wrapper = shallow(<UserHome />);
    expect(wrapper.find('h3')).to.have.length(1);
  });

  it('should have an image', function() {
    const wrapper = shallow(<UserHome />);
    expect(wrapper.find('img')).to.have.length(1);
  });

  it('should have a bootstrap button', function() {
    const wrapper = shallow(<UserHome />);
    expect(wrapper.find('Button')).to.have.length(1);
  });
});
