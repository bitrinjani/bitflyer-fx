import * as _ from 'lodash';
import * as crypto from 'crypto';
import * as querystring from 'querystring';
import { Execution, Order } from './types';

export function eRound(n: number): number {
  return _.round(n, 10);
}

export function hmac(secret: string, text: string, algo: string = 'sha256'): string {
  return crypto
    .createHmac(algo, secret)
    .update(text)
    .digest('hex');
}

export const nonce: () => string = (function() {
  let prev = 0;
  return function() {
    const n = Date.now();
    if (n <= prev) {
      prev += 1;
      return prev.toString();
    }
    prev = n;
    return prev.toString();
  };
})();

export function safeQueryStringStringify(o: any) {
  const noUndefinedFields = _.pickBy(o, _.negate(_.isUndefined));
  return querystring.stringify(noUndefinedFields);
}

export function toExecution(order: Order): Partial<Execution> {
  return {
    broker: order.broker,
    brokerOrderId: order.brokerOrderId,
    cashMarginType: order.cashMarginType,
    side: order.side,
    symbol: order.symbol
  };
}