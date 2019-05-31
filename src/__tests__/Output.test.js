import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import App from '../App.js';
import { exportAllDeclaration } from '@babel/types';

let wrapped;

beforeEach(() => {
  wrapped = mount(<App />);
})

afterEach(() => {
  wrapped.unmount()
})


// it('show a output element', () => {
//     expect(wrapped.find('#output-data').length).toEqual(1);
//   })

it('return a correct output', () => {
  setTimeout(()=> {wrapped.find('#input-fraze').simulate('change', {
    target: { value: 'Name/BTC'}
});
wrapped.update();
expect(wrapped.find('#output-data').prop('value')).toEqual('Bitcoi')}, 000)
  console.log('AAAAAA', wrapped)
  
})



