import React from 'react';
import { shallow, mount } from 'enzyme';
import LoadingNotification from './index';

describe('LoadingNotification', () => {
  const loadingMessage = <div className="ui text loader">Loading...</div>;

  test('renders without crashing', () => {
    shallow(<LoadingNotification />);
  });

  test('should match the snapshot', () => {
    const wrapper = mount(<LoadingNotification show={true} />);
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('when show is set to false, notification does not show', () => {
    const wrapper = mount(<LoadingNotification show={false} />);
    expect(wrapper.find('.content')).toHaveLength(0);
  });
  test('when show is set to true, notification does shows', () => {
    const wrapper = mount(<LoadingNotification show={true} />);
    expect(wrapper.find('.content')).toHaveLength(1);
  });
});

