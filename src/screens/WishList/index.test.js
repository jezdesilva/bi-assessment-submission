import React from 'react';
import { shallow, mount } from 'enzyme';
import { Wishlist } from './index';

describe('Wishlist', () => {
  test('renders without crashing', () => {
    shallow(<Wishlist books={[]} />);
  });

  test('shows books table when array is passed in', () => {
    const wrapper = shallow(<Wishlist books={[{}, {}, {}]} />);
    expect(wrapper.find('Connect(BookTable)').exists()).toBe(true);
  })

  test('doesn\'t show books table when no array is passed in', () => {
    const wrapper = shallow(<Wishlist books={[]} />);
    expect(wrapper.find('Connect(BookTable)').exists()).toBe(false);
  })
});
