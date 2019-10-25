import React from 'react';
import { shallow, mount } from 'enzyme'
import { DisplayDetail } from './index';
import {
  SEARCH_EVERYTHING,
} from '../../constants';

describe('DisplayDetail', () => {
  test('renders without crashing', () => {
    shallow(<DisplayDetail query="query", />);
  });
}); detail_name