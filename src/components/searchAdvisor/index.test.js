import React from 'react';
import { shallow } from 'enzyme';
import SearchAdvisor from './index';

describe('SearchAdvisor', () => {
  const QUERY = 'test';
  const wrapper = shallow(<SearchAdvisor query={QUERY} />);

  test('it renders without crashing', () => {
    shallow(<SearchAdvisor query="test" />);
  });

  test('should match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders the message correctly', () => {
    expect(wrapper.find('mark').text()).toEqual(QUERY);
  });
});