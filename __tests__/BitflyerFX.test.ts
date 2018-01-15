import BitflyerFX from '../lib/BrokerAdapterImpl';
import { BrokerConfigType, CashMarginType } from '../lib/types';
import { options } from '../lib/logger';
import nocksetup from './nocksetup';
import * as nock from 'nock';

describe('BitflyerFX', () => {
  beforeAll(() => {
    nocksetup();
  });

  afterAll(() => {
    nock.restore();
  });

  test('getPositions', async () => {
    const config: BrokerConfigType = {
      broker: 'BitflyerFX',
      enabled: true,
      maxLongPosition: 0.1,
      maxShortPosition: 0.1,
      key: 'key',
      secret: 'secret',
      cashMarginType: CashMarginType.NetOut
    };
    const api = new BitflyerFX(config);
    const result = await api.getBtcPosition();
    expect(result).toBe(-0.031);
  });

  test('fetchQuotes', async () => {
    const config: BrokerConfigType = {
      broker: 'BitflyerFX',
      enabled: true,
      maxLongPosition: 0.1,
      maxShortPosition: 0.1,
      key: 'key',
      secret: 'secret',
      cashMarginType: CashMarginType.NetOut
    };
    const api = new BitflyerFX(config);
    const result = await api.fetchQuotes();
    expect(result.length).toBe(4);
  });
});
