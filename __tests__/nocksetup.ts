// tslint:disable
import * as nock from 'nock';

function nocksetup() {
  const api = nock('https://api.bitflyer.jp');

  api
    .post('/v1/me/sendchildorder', {
      product_code: 'FX_BTC_JPY',
      child_order_type: 'LIMIT',
      side: 'BUY',
      price: 30000,
      size: 0.1,
      time_in_force: /.*/
    })
    .times(10)
    .reply(200, {
      child_order_acceptance_id: 'JRF20150707-050237-639234'
    });
  api
    .post('/v1/me/cancelchildorder', {
      product_code: 'FX_BTC_JPY',
      child_order_acceptance_id: 'JRF20150707-033333-099999'
    })
    .reply(200);
  api.get('/v1/me/getchildorders?product_code=FX_BTC_JPY&child_order_acceptance_id=JRF20150707-084547-396699').reply(200, [
    {
      id: 138397,
      child_order_id: 'JOR20150707-084549-022519',
      product_code: 'FX_BTC_JPY',
      side: 'SELL',
      child_order_type: 'LIMIT',
      price: 30000,
      average_price: 0,
      size: 0.1,
      child_order_state: 'CANCELED',
      expire_date: '2015-07-14T07:25:47',
      child_order_date: '2015-07-07T08:45:47',
      child_order_acceptance_id: 'JRF20150707-084547-396699',
      outstanding_size: 0,
      cancel_size: 0.1,
      executed_size: 0,
      total_commission: 0
    }
  ]);
  api.get('/v1/me/getchildorders?product_code=FX_BTC_JPY&child_order_acceptance_id=JRF20171103-092007-284294').reply(200, [
    {
      id: 149550970,
      child_order_id: 'JOR20171103-092009-823736',
      product_code: 'FX_BTC_JPY',
      side: 'SELL',
      child_order_type: 'LIMIT',
      price: 846700,
      average_price: 846700,
      size: 0.01,
      child_order_state: 'COMPLETED',
      expire_date: '2017-12-03T09:20:07',
      child_order_date: '2017-11-03T09:20:07',
      child_order_acceptance_id: 'JRF20171103-092007-284294',
      outstanding_size: 0,
      cancel_size: 0,
      executed_size: 0.01,
      total_commission: 0.000015
    }
  ]);
  api.get('/v1/me/getchildorders?product_code=FX_BTC_JPY&child_order_acceptance_id=JRF12345').reply(200, [
    {
      id: 149550970,
      child_order_id: 'JRF12345',
      product_code: 'FX_BTC_JPY',
      side: 'SELL',
      child_order_type: 'LIMIT',
      price: 846700,
      average_price: 846700,
      size: 0.01,
      child_order_state: 'EXPIRED',
      expire_date: '2017-12-03T09:20:07',
      child_order_date: '2017-11-03T09:20:07',
      child_order_acceptance_id: 'JRF12345',
      outstanding_size: 0,
      cancel_size: 0,
      executed_size: 0,
      total_commission: 0.000015
    }
  ]);
  api.get('/v1/me/getchildorders?product_code=FX_BTC_JPY&child_order_acceptance_id=JRF12345').reply(200, [
    {
      id: 149550970,
      child_order_id: 'JRF12345',
      product_code: 'FX_BTC_JPY',
      side: 'SELL',
      child_order_type: 'LIMIT',
      price: 846700,
      average_price: 846700,
      size: 0.01,
      child_order_state: 'CANCELED',
      expire_date: '2017-12-03T09:20:07',
      child_order_date: '2017-11-03T09:20:07',
      child_order_acceptance_id: 'JRF12345',
      outstanding_size: 0,
      cancel_size: 0,
      executed_size: 0,
      total_commission: 0.000015
    }
  ]);
  api.get('/v1/me/getchildorders?product_code=FX_BTC_JPY&child_order_acceptance_id=JRF12345').reply(200, [
    {
      id: 149550970,
      child_order_id: 'JRF12345',
      product_code: 'FX_BTC_JPY',
      side: 'SELL',
      child_order_type: 'LIMIT',
      price: 846700,
      average_price: 846700,
      size: 0.01,
      child_order_state: 'ABC',
      expire_date: '2017-12-03T09:20:07',
      child_order_date: '2017-11-03T09:20:07',
      child_order_acceptance_id: 'JRF12345',
      outstanding_size: 0,
      cancel_size: 0,
      executed_size: 0.005,
      total_commission: 0.000015
    }
  ]);
  api.get('/v1/me/getchildorders?product_code=FX_BTC_JPY&child_order_acceptance_id=MOCK').reply(200, []);
  api.get('/v1/me/getexecutions?product_code=FX_BTC_JPY&child_order_acceptance_id=JRF20171103-092007-284294').reply(200, [
    {
      id: 64923644,
      side: 'SELL',
      price: 846700,
      size: 0.01,
      exec_date: '2017-11-03T09:20:09.12',
      child_order_id: 'JOR20171103-092009-823736',
      commission: 0.000015,
      child_order_acceptance_id: 'JRF20171103-092007-284294'
    }
  ]);
  api
    .get('/v1/me/getexecutions?product_code=FX_BTC_JPY&child_order_acceptance_id=JRF12345')
    .times(10)
    .reply(200, []);
  api.get('/v1/board?product_code=FX_BTC_JPY').reply(200, {
    mid_price: 33320,
    bids: [
      {
        price: 30000,
        size: 0.1
      },
      {
        price: 25570,
        size: 3
      }
    ],
    asks: [
      {
        price: 36640,
        size: 5
      },
      {
        price: 36700,
        size: 1.2
      }
    ]
  });
  api.get('/v1/board?product_code=FX_BTC_JPY').reply(500);
  api.get('/v1/me/getexecutions?product_code=FX_BTC_JPY&child_order_acceptance_id=JRF20150707-060559-396699').reply(200, [
    {
      id: 37233,
      child_order_id: 'JOR20150707-060559-021935',
      side: 'BUY',
      price: 33470,
      size: 0.01,
      commission: 0,
      exec_date: '2015-07-07T09:57:40.397',
      child_order_acceptance_id: 'JRF20150707-060559-396699'
    },
    {
      id: 37232,
      child_order_id: 'JOR20150707-060426-021925',
      side: 'BUY',
      price: 33470,
      size: 0.01,
      commission: 0,
      exec_date: '2015-07-07T09:57:40.397',
      child_order_acceptance_id: 'JRF20150707-060559-396699'
    }
  ]);
  api.get('/v1/me/getpositions?product_code=FX_BTC_JPY').reply(200, [
    {
      product_code: 'FX_BTC_JPY',
      side: 'SELL',
      price: 1939635,
      size: 0.003,
      commission: 0,
      swap_point_accumulate: 0,
      require_collateral: 387.927,
      open_date: '2018-01-14T23:58:14.66',
      leverage: 15,
      pnl: -4.329
    },
    {
      product_code: 'FX_BTC_JPY',
      side: 'SELL',
      price: 1938304,
      size: 0.013,
      commission: 0,
      swap_point_accumulate: 0,
      require_collateral: 1679.8634666666667,
      open_date: '2018-01-14T23:58:14.66',
      leverage: 15,
      pnl: -36.062
    },
    {
      product_code: 'FX_BTC_JPY',
      side: 'SELL',
      price: 1938303,
      size: 0.012,
      commission: 0,
      swap_point_accumulate: 0,
      require_collateral: 1550.6424,
      open_date: '2018-01-14T23:58:14.66',
      leverage: 15,
      pnl: -33.3
    },
    {
      product_code: 'FX_BTC_JPY',
      side: 'SELL',
      price: 1940073,
      size: 0.003,
      commission: 0,
      swap_point_accumulate: 0,
      require_collateral: 388.0146,
      open_date: '2018-01-14T23:58:24.977',
      leverage: 15,
      pnl: -3.015
    }
  ]);
}

export default nocksetup;
