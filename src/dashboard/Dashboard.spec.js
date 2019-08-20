import React from 'react';
import renderer from 'react-test-renderer'; //
import { render, fireEvent, cleanup } from '@testing-library/react/pure';
import Dashboard from './Dashboard.js';

describe('<Dashboard /> snapshot', () => {
  beforeEach(cleanup);
  it('matches snapshot', () => {
    const tree = renderer.create(<Dashboard />);

    expect(tree.toJSON()).toMatchSnapshot();
  });
});

describe('<Dashboard />', () => {
  beforeEach(cleanup);
  it('renders without crashing', () => {
    render(<Dashboard />);
  });
});

describe('<Dashboard /> state transitions', () => {
  const { getByText } = render(<Dashboard />);

  // 1 defaults
  it('defaults to open and unlocked', () => {
    //text
    getByText(/^open$/i);
    getByText(/^unlocked$/i);
    //buttons
    getByText(/^lock gate$/i);
    getByText(/^close gate$/i);
  });

  // 2 open/unlocked => closed/lunlocked

  it('goes from open and unlocked to closed and unlocked', () => {
    const closeBtn = getByText(/^close gate$/i);
    fireEvent.click(closeBtn);
    //text
    getByText(/^closed$/i); // special characters that match the beginning and end of text. makes sure only gettting "locked" not "unlocked"
    getByText(/^unlocked$/i);
    //buttons
    getByText(/^lock gate$/i);
    getByText(/^open gate/i);
  });

  // 3 closed/unlocked => closed/locked

  it('goes from closed and unlocked to closed and locked', () => {
    const lockBtn = getByText(/^lock gate$/i);
    fireEvent.click(lockBtn);
    //text
    getByText(/^closed$/i);
    getByText(/^locked$/i);
    //buttons
    getByText(/^unlock gate$/i);
    getByText(/^open gate/i);
  });

  // 4 closed/locked => closed/unlocked
  it('goes from closed and locked to closed and unlocked', () => {
    const lockBtn = getByText(/^unlock gate$/i);
    fireEvent.click(lockBtn);
    //text
    getByText(/^closed$/i);
    getByText(/^unlocked$/i);
    //buttons
    getByText(/^lock gate$/i);
    getByText(/^open gate/i);
  });

  //5 closed/unlocked => open/unlocked

  it('goes from closed and unlocked to open and unlocked', () => {
    const openBtn = getByText(/open gate/i);
    fireEvent.click(openBtn);
    //text
    getByText(/^open$/i);
    getByText(/^unlocked$/i);
    //buttons
    getByText(/^lock gate$/i);
    getByText(/^close gate/i);
  });
});
