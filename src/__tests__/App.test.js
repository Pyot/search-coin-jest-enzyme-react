import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from '../App';

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

it('show a input for fraze element', () => {
  const wrapped =  shallow(<App />);
  expect(wrapped.find('#input-fraze').length).toEqual(1);
})

it('show a output element', () => {
  const wrapped =  shallow(<App />);
  expect(wrapped.find('#output-data').length).toEqual(1);
})

