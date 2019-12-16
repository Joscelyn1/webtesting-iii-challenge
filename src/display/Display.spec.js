import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent, getByTestId } from '@testing-library/react';
import Display from './Display';
import '@testing-library/jest-dom/extend-expect';

describe('<Display />', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(<Display />);

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders without crashing', () => {
    render(<Display />);
  });
  it('is open and unlocked', () => {
    const { getByText, queryByText } = render(
      <Display closed={false} locked={false} />
    );
    //check for correct text
    const unlock = getByText(/unlocked/i);
    const lock = getByText(/open/i);
    //check for correct colors using css classes
    expect(unlock).toHaveClass('green-led');
    //check that incorrect text does not show up in document
    expect(queryByText(/closed/i)).toBe(null);
  });

  it('closed and unlocked', () => {
    const { getByText } = render(<Display closed={true} locked={false} />);
  });

  /* getBy returns an error if it's not there. queryBy just returns null
  
  however if you want to test with queryBy you can do expect(queryByText(/closed/i)).toBeTruthy()*/
});
