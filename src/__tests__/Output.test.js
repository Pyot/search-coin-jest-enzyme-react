import React from 'react';
import { mount, shallow } from 'enzyme';
import moxios from 'moxios';
import App from '../App.js';

let wrapped;

beforeEach(() => {
  wrapped = mount(<App />);

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
  const mockSuccessResponse = [{
          name: "Bitcoin",
          price_usd: "99.99",
          symbol: 'BTC'
        }];
  const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
  const mockFetchPromise = Promise.resolve({ // 3
    json: () => mockJsonPromise,
  });
  jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); // 4

  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.fetch).toHaveBeenCalledWith('https://api.coinpaprika.com/v1/ticker/');
  wrapped.update()

  process.nextTick(() => { // 6
    console.log('gg15', wrapped.state())
  wrapped.update()

    wrapped.find('#input-fraze').simulate('change', {
      target: { value: 'Price/BTC' }
    });
    wrapped.update()

    expect(wrapped.find('#output-data').prop('value')).toEqual('99.99');
    global.fetch.mockClear(); // 7
    done(); // 8
  });
})

it('return a empty string for missing coin', (done) => {
  const mockSuccessResponse = [{
          name: "Bitcoin",
          price_usd: "99.99",
          symbol: 'BTC'
        }];
  const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
  const mockFetchPromise = Promise.resolve({ // 3
    json: () => mockJsonPromise,
  });
  jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); // 4

  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.fetch).toHaveBeenCalledWith('https://api.coinpaprika.com/v1/ticker/');
  wrapped.update()

  process.nextTick(() => { // 6
    console.log('gg15', wrapped.state())
  wrapped.update()

    wrapped.find('#input-fraze').simulate('change', {
      target: { value: 'Price/WRONG_NAME' }
    });
    wrapped.update()

    expect(wrapped.find('#output-data').prop('value')).toEqual('');
    global.fetch.mockClear(); // 7
    done(); // 8
  });
})

it('clean output after changed input', (done) => {
  const mockSuccessResponse = [{
          name: "Bitcoin",
          price_usd: "99.99",
          symbol: 'BTC'
        }];
  const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
  const mockFetchPromise = Promise.resolve({ // 3
    json: () => mockJsonPromise,
  });
  jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); // 4

  
  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.fetch).toHaveBeenCalledWith('https://api.coinpaprika.com/v1/ticker/');
  wrapped.update()

  process.nextTick(() => { // 6
    console.log('gg15', wrapped.state())
  wrapped.update()

    wrapped.find('#input-fraze').simulate('change', {
      target: { value: 'Price/BTC' }
    });
    wrapped.update()

    expect(wrapped.find('#output-data').prop('value')).toEqual('Bitcoin');
    wrapped.update()

    wrapped.find('#input-fraze').simulate('change', {
      target: { value: 'Price/BTC5' }
    });
    wrapped.update()

    expect(wrapped.find('#output-data').prop('value')).toEqual('');
    global.fetch.mockClear(); // 7
    done(); // 8
  });
})



