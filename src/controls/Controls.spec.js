import React from 'react';
import renderer from 'react-test-renderer';
import { render, cleanup, fireEvent } from '@testing-library/react';

import Controls from './Controls';

afterEach(cleanup);
describe('<Controls />', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(<Controls />);

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders without crashing', () => {
    render(<Controls />);
  });

  it('is open and unlocked', () => {
    const closeSpy = jest.fn();
    const lockSpy = jest.fn();

    const { getByText } = render(
      <Controls
        closed={false}
        locked={false}
        toggleClosed={closeSpy}
        toggleLocked={lockSpy}
      />
    );
    const closeBtn = getByText(/close gate/i);
    const lockBtn = getByText(/lock gate/i);

    // checking button disabled status
    expect(closeBtn.disabled).toBeFalsy();
    expect(lockBtn.disabled).toBeTruthy();

    //checking button click events
    fireEvent.click(closeBtn);
    expect(closeSpy).toBeCalled();

    fireEvent.click(lockBtn);
    expect(lockSpy).not.toBeCalled();
  });

  it('is closed and unlocked', () => {
    const closeSpy = jest.fn();
    const lockSpy = jest.fn();

    const { getByText } = render(
      <Controls
        closed={true}
        locked={false}
        toggleClosed={closeSpy}
        toggleLocked={lockSpy}
      />
    );
    const closeBtn = getByText(/open gate/i);
    const lockBtn = getByText(/lock gate/i);

    // checking button disabled status
    expect(closeBtn.disabled).toBeFalsy();
    expect(lockBtn.disabled).toBeFalsy();

    //checking button click events
    fireEvent.click(closeBtn);
    expect(closeSpy).toBeCalled();

    fireEvent.click(lockBtn);
    expect(lockSpy).toBeCalled();
  });

  it('is closed and locked', () => {
    const closeSpy = jest.fn();
    const lockSpy = jest.fn();

    const { getByText } = render(
      <Controls
        closed={true}
        locked={true}
        toggleClosed={closeSpy}
        toggleLocked={lockSpy}
      />
    );
    const closeBtn = getByText(/open gate/i);
    const lockBtn = getByText(/unlock gate/i);

    // checking button disabled status
    expect(closeBtn.disabled).toBeTruthy();
    expect(lockBtn.disabled).toBeFalsy();

    //checking button click events
    fireEvent.click(closeBtn);
    expect(closeSpy).not.toBeCalled();

    fireEvent.click(lockBtn);
    expect(lockSpy).toBeCalled();
  });
});

/*
- defaults to `unlocked` and `open`
- cannot be closed or opened if it is locked
*/
//lockUnlock
//openClose

/*

"defaults to 'unlocked' and 'open'", () => {
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

  */
