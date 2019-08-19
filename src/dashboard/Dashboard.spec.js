import React from 'react';
import renderer from 'react-test-renderer'; // 1: install this npm module as a dev dependency
import { render, fireEvent, getByTestId } from '@testing-library/react';
import Dashboard from '../dashboard/Dashboard.js';
import Controls from './Controls';

describe('<Dashboard />', () => {
  // 2. write this test
  it('matches snapshot', () => {
    const tree = renderer.create(<Controls />); // generates a DOM tree

    // snapshots are a JSON representation of the DOM tree
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
