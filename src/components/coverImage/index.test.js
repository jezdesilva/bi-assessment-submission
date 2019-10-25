import React from 'react';
import TestRenderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import CoverImage from './index'
import { PLACEHOLDER_IMAGE } from '../../constants';

describe('CoverImage', () => {
  const WORKING_URL = 'http://something.com/workingUrl.jpg';
  const BROKEN_URL = 'htp/:somethng.cm/brokenUrl.jpg';
  const ISBN_CODE = '38DF8G7DH879D';
  const TITLE = 'test title';
  const createWrapper = (title, isbnCode, coverImgUrl) => mount(<CoverImage title={title} isbnCode={isbnCode} coverImgUri={coverImgUrl} />);

  test('it renders without crashing', () => {
    createWrapper(TITLE, ISBN_CODE, WORKING_URL);
  });

  test('that it renders an img tag', () => {
    const wrapper = createWrapper(TITLE, ISBN_CODE, WORKING_URL);
    const img = wrapper.find('img');
    expect(img).toBeDefined();
    expect(img).toHaveLength(1);
  });

  test('when no ISBN code is not supplied, should request the the placeholder image', () => {
    const wrapper = createWrapper(TITLE, undefined, BROKEN_URL);
    expect(wrapper.find('img').prop('src')).toEqual(PLACEHOLDER_IMAGE);
  });

  test('when an ISBN code is supplied, should request the the cover image', () => {
    const wrapper = createWrapper(TITLE, ISBN_CODE, WORKING_URL);
    expect(wrapper.find('img').prop('src')).toEqual(WORKING_URL);
  });

  test('when the cover image loaded is less than 10px in width, should request the the placeholder image', () => {
    const wrapper = createWrapper(TITLE, ISBN_CODE, WORKING_URL);
    expect(wrapper.find('img').simulate('load', { target: { naturalWidth: 5 }}));
    expect(wrapper.update().find('img').prop('src')).toEqual(PLACEHOLDER_IMAGE);
  });

  test('when the cover image loaded is more than 10px in width, should display the the cover image', () => {
    const wrapper = createWrapper(TITLE, ISBN_CODE, WORKING_URL);
    expect(wrapper.find('img').simulate('load', { target: { naturalWidth: 15 } }));
    expect(wrapper.update().find('img').prop('src')).toEqual(WORKING_URL);
  });

  test('when the cover image fails to load, should request the the placeholder image', () => {
    const wrapper = createWrapper(TITLE, ISBN_CODE, WORKING_URL);
    expect(wrapper.find('img').simulate('error'));
    expect(wrapper.update().find('img').prop('src')).toEqual(PLACEHOLDER_IMAGE);
  });
});
