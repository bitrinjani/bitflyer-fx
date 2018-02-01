// tslint:disable
import * as nock from 'nock';
import * as _ from 'lodash';
import nocksetup from './nocksetup';
import { Broker, OrderSide, CashMarginType, OrderType, BrokerConfigType, OrderStatus, TimeInForce } from '../lib/types';
import BitflyerFX from '../lib/BrokerAdapterImpl';

function createOrder(
  broker: Broker,
  side: OrderSide,
  size: number,
  price: number,
  cashMarginType: CashMarginType,
  type: OrderType,
  leverageLevel: number
) {
  return {
    broker,
    side,
    size,
    price,
    cashMarginType,
    type,
    leverageLevel,
    symbol: 'BTC/JPY',
    timeInForce: TimeInForce.None
  };
}
const brokerConfig: BrokerConfigType = {
  broker: 'BitflyerFX',
  enabled: true,
  maxLongPosition: 0.1,
  maxShortPosition: 0.1,
  key: 'key',
  secret: 'secret',
  cashMarginType: CashMarginType.NetOut
};

describe('Bitflyer BrokerAdapter', () => {
  beforeAll(() => {
    nocksetup();
  });

  afterAll(() => {
    nock.restore();
  });

  test('send wrong broker order', async () => {
    const target = new BitflyerFX(brokerConfig);
    const order = { broker: 'Coincheck' };
    try {
      await target.send(order);
    } catch (ex) {
      return;
    }
    expect(false).toBe(true);
  });

  test('send wrong cashMarginType', async () => {
    const target = new BitflyerFX(brokerConfig);
    const order = { broker: 'BitflyerFX', cashMarginType: CashMarginType.MarginOpen, symbol: 'ZZZ' };
    try {
      await target.send(order);
    } catch (ex) {
      return;
    }
    expect(false).toBe(true);
  });

  test('send wrong symbol order', async () => {
    const target = new BitflyerFX(brokerConfig);
    const order = { broker: 'BitflyerFX', cashMarginType: CashMarginType.NetOut, symbol: 'ZZZ' };
    try {
      await target.send(order);
    } catch (ex) {
      return;
    }
    expect(false).toBe(true);
  });

  test('send StopLimit order', async () => {
    const target = new BitflyerFX(brokerConfig);
    const order = {
      broker: 'BitflyerFX',
      cashMarginType: CashMarginType.NetOut,
      symbol: 'BTC/JPY',
      type: OrderType.StopLimit
    };
    try {
      await target.send(order);
    } catch (ex) {
      return;
    }
    expect(false).toBe(true);
  });

  test('send wrong time in force', async () => {
    const target = new BitflyerFX(brokerConfig);
    const order = {
      broker: 'BitflyerFX',
      cashMarginType: CashMarginType.NetOut,
      symbol: 'BTC/JPY',
      type: OrderType.Market,
      timeInForce: 'MOCK'
    };
    try {
      await target.send(order);
    } catch (ex) {
      return;
    }
    expect(false).toBe(true);
  });

  test('cancel', async () => {
    const target = new BitflyerFX(brokerConfig);
    const order = { symbol: 'BTC/JPY', brokerOrderId: 'JRF20150707-033333-099999' };
    await target.cancel(order);
    expect(order.status).toBe(OrderStatus.Canceled);
  });

  test('cancel wrong symbol', async () => {
    const target = new BitflyerFX(brokerConfig);
    const order = { symbol: 'MOCK' };
    try {
      await target.cancel(order);
    } catch (ex) {
      return;
    }
    expect(false).toBe(true);
  });

  test('send buy limit', async () => {
    const target = new BitflyerFX(brokerConfig);
    const order = createOrder(
      'BitflyerFX',
      OrderSide.Buy,
      0.1,
      30000,
      CashMarginType.NetOut,
      OrderType.Limit,
      undefined
    );
    await target.send(order);
    expect(order.status).toBe(OrderStatus.New);
    expect(order.brokerOrderId).toBe('JRF20150707-050237-639234');
  });

  test('send buy limit Fok', async () => {
    const target = new BitflyerFX(brokerConfig);
    const order = createOrder(
      'BitflyerFX',
      OrderSide.Buy,
      0.1,
      30000,
      CashMarginType.NetOut,
      OrderType.Limit,
      undefined
    );
    order.timeInForce = TimeInForce.Fok;
    await target.send(order);
    expect(order.status).toBe(OrderStatus.New);
    expect(order.brokerOrderId).toBe('JRF20150707-050237-639234');
  });

  test('send buy limit Ioc', async () => {
    const target = new BitflyerFX(brokerConfig);
    const order = createOrder(
      'BitflyerFX',
      OrderSide.Buy,
      0.1,
      30000,
      CashMarginType.NetOut,
      OrderType.Limit,
      undefined
    );
    order.timeInForce = TimeInForce.Ioc;
    await target.send(order);
    expect(order.status).toBe(OrderStatus.New);
    expect(order.brokerOrderId).toBe('JRF20150707-050237-639234');
  });

  test('refresh', async () => {
    const target = new BitflyerFX(brokerConfig);
    const order = {
      symbol: 'BTC/JPY',
      type: 'Limit',
      timeInForce: 'None',
      id: '438f7c7b-ed72-4719-935f-477ea043e2b0',
      status: 'New',
      creationTime: '2017-11-03T09:20:06.687Z',
      executions: [],
      broker: 'BitflyerFX',
      size: 0.01,
      side: 'Sell',
      price: 846700,
      cashMarginType: 'NetOut',
      brokerOrderId: 'JRF20171103-092007-284294',
      sentTime: '2017-11-03T09:20:07.292Z',
      lastUpdated: '2017-11-03T09:20:07.292Z'
    };
    await target.refresh(order);
    expect(order.status).toBe(OrderStatus.Filled);
  });

  test('refresh Expired', async () => {
    const target = new BitflyerFX(brokerConfig);
    const order = {
      symbol: 'BTC/JPY',
      type: 'Limit',
      timeInForce: 'None',
      id: '438f7c7b-ed72-4719-935f-477ea043e2b0',
      status: 'New',
      creationTime: '2017-11-03T09:20:06.687Z',
      executions: [],
      broker: 'BitflyerFX',
      size: 0.01,
      side: 'Sell',
      price: 846700,
      cashMarginType: 'NetOut',
      brokerOrderId: 'JRF12345',
      sentTime: '2017-11-03T09:20:07.292Z',
      lastUpdated: '2017-11-03T09:20:07.292Z'
    };
    await target.refresh(order);
    expect(order.status).toBe(OrderStatus.Expired);
  });

  test('refresh Canceled', async () => {
    const target = new BitflyerFX(brokerConfig);
    const order = {
      symbol: 'BTC/JPY',
      type: 'Limit',
      timeInForce: 'None',
      id: '438f7c7b-ed72-4719-935f-477ea043e2b0',
      status: 'New',
      creationTime: '2017-11-03T09:20:06.687Z',
      executions: [],
      broker: 'BitflyerFX',
      size: 0.01,
      side: 'Sell',
      price: 846700,
      cashMarginType: 'NetOut',
      brokerOrderId: 'JRF12345',
      sentTime: '2017-11-03T09:20:07.292Z',
      lastUpdated: '2017-11-03T09:20:07.292Z'
    };
    await target.refresh(order);
    expect(order.status).toBe(OrderStatus.Canceled);
  });

  test('refresh Partially filled', async () => {
    const target = new BitflyerFX(brokerConfig);
    const order = {
      symbol: 'BTC/JPY',
      type: 'Limit',
      timeInForce: 'None',
      id: '438f7c7b-ed72-4719-935f-477ea043e2b0',
      status: 'New',
      creationTime: '2017-11-03T09:20:06.687Z',
      executions: [],
      broker: 'BitflyerFX',
      size: 0.01,
      side: 'Sell',
      price: 846700,
      cashMarginType: 'NetOut',
      brokerOrderId: 'JRF12345',
      sentTime: '2017-11-03T09:20:07.292Z',
      lastUpdated: '2017-11-03T09:20:07.292Z'
    };
    await target.refresh(order);
    expect(order.status).toBe(OrderStatus.PartiallyFilled);
  });

  test('refresh unknown order id', async () => {
    const target = new BitflyerFX(brokerConfig);
    const order = {
      symbol: 'BTC/JPY',
      type: 'Limit',
      timeInForce: 'None',
      id: '438f7c7b-ed72-4719-935f-477ea043e2b0',
      status: 'New',
      creationTime: '2017-11-03T09:20:06.687Z',
      executions: [],
      broker: 'BitflyerFX',
      size: 0.01,
      side: 'Sell',
      price: 846700,
      cashMarginType: 'NetOut',
      brokerOrderId: 'MOCK',
      sentTime: '2017-11-03T09:20:07.292Z',
      lastUpdated: '2017-11-03T09:20:07.292Z'
    };
    await target.refresh(order);
    expect(order.status).toBe(OrderStatus.New);
  });
});
