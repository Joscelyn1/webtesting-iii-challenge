import React from 'react';
import renderer from 'react-test-renderer'; // 1: install this npm module as a dev dependency
import { render, fireEvent, getByTestId } from '@testing-library/react';
import Dashboard from '../dashboard/Dashboard.js';
import Controls from './Controls';

describe('<Controls />', () => {
  // 2. write this test
  it('matches snapshot', () => {
    const tree = renderer.create(<Controls />); // generates a DOM tree

    // snapshots are a JSON representation of the DOM tree
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("defaults to 'unlocked' and 'open'", () => {
    const { getByText } = render(<Dashboard />);
    expect(getByText('Locked Gate'));
    expect(getByText('Closed Gate'));
    expect(getByText('Open'));
    expect(getByText('Unlocked'));
  });

  it('cannot be closed or opened if it is locked', () => {
    const { getByText, queryByText } = render(<Dashboard />);

    const openCloseButton = getByTestId('openClose');

    fireEvent.click(openCloseButton);
  });
});

/*
- defaults to `unlocked` and `open`
- cannot be closed or opened if it is locked
*/
//lockUnlock
//openClose
