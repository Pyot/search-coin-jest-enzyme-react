import React from 'react';
import { mount, shallow } from 'enzyme';
import moxios from 'moxios';
import App from '../App.js';

let wrapped;

beforeEach(() => {
  const mockSuccessResponse = [{
    name: "Bitcoin",
    price_usd: "99.99",
    symbol: "BTC"
  }];
  const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
  const mockFetchPromise = Promise.resolve({ // 3
    json: () => mockJsonPromise,
  });
  jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
  wrapped = mount(<App />)
})

it('check jest-fetch-mock is add fake api respond', (done) => {
  process.nextTick(() => { 
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://api.coinpaprika.com/v1/ticker/');
    global.fetch.mockClear();
    wrapped.unmount();
    done(); 
  });
})

it('return a correct output for Name/BTC input', (done) => {
  process.nextTick(() => { 
    wrapped.update();

    wrapped.find('#input-fraze').simulate('change', {
      target: { value: 'Name/BTC' }
    });
    wrapped.update();

    expect(wrapped.find('#output-data').prop('value')).toEqual("Bitcoin");
    global.fetch.mockClear();
    wrapped.unmount();
    done(); 
  });
})


it('return a correct output for Price/BTC input', (done) => {
  process.nextTick(() => { 
    wrapped.update();

    wrapped.find('#input-fraze').simulate('change', {
      target: { value: 'Price/BTC' }
    });
    wrapped.update();

    expect(wrapped.find('#output-data').prop('value')).toEqual("99.99");
    global.fetch.mockClear();
    wrapped.unmount();
    done(); 
  });
})

it('return a empty string for missing coin', (done) => {
  process.nextTick(() => { 
    wrapped.update()

    wrapped.find('#input-fraze').simulate('change', {
      target: { value: 'Price/WRONG_NAME' }
    });
    wrapped.update()

    expect(wrapped.find('#output-data').prop('value')).toEqual('');
    global.fetch.mockClear();
    wrapped.unmount();
    done();
  });
})

it('clean output after changed input', (done) => {
  process.nextTick(() => {
    wrapped.update()

    wrapped.find('#input-fraze').simulate('change', {
      target: { value: 'Price/BTC' }
    });
    wrapped.update()

    expect(wrapped.find('#output-data').prop('value')).toEqual('99.99');
    wrapped.update()

    wrapped.find('#input-fraze').simulate('change', {
      target: { value: 'Price/BTC5' }
    });
    wrapped.update()

    expect(wrapped.find('#output-data').prop('value')).toEqual('');
    global.fetch.mockClear();
    done();
  });
})



