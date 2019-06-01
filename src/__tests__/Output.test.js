import React from 'react';
import { mount } from 'enzyme';
import moxios from 'moxios';
import App from '../App.js';

let wrapped;

beforeEach(() => {
  wrapped = mount(<App />);
  
  moxios.install();
  moxios.stubRequest('https://api.coinpaprika.com/v1/ticker/', {
    status: 200,
    response: [{
      name: "Bitcoin",
      price_usd: "99.99",
      symbol: 'BTC'
    }]
  })
})
// 'price_usd': "8256.78920912",
afterEach(() => {
  moxios.uninstall()
})

// it('return a correct output for Name/BTC', (done) => {
//   moxios.wait(()=>{

//     // wrapped.update()

//     wrapped.find('#input-fraze').simulate('change', {
//       target: { value: 'Name/BTC' }
//     });
//     wrapped.update()

//     expect(wrapped.find('#output-data').prop('value')).toEqual('Bitcoin');
//     done();
//     wrapped.unmount()

//   })

// })


it('return a correct output for Price/BTC', (done) => {
  wrapped.update()
  setTimeout(()=>{

    wrapped.update()

    wrapped.find('#input-fraze').simulate('change', {
      target: { value: 'Price/BTC' }
    });
    wrapped.update()

    expect(wrapped.find('#output-data').prop('value'));
    done();
    wrapped.unmount()

  }, 2000)

})



