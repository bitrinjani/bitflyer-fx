import { hmac, nonce, safeQueryStringStringify } from './util';
import WebClient from './WebClient';
import {
  SendChildOrderRequest,
  SendChildOrderResponse,
  CancelChildOrderRequest,
  CancelChildOrderResponse,
  ChildOrdersParam,
  ChildOrdersResponse,
  ExecutionsResponse,
  ExecutionsParam,
  Execution,
  BoardResponse,
  ChildOrder,
  PositionsResponse,
  FXPosition
} from './brokerTypes';

export default class BrokerApi {
  private readonly baseUrl = 'https://api.bitflyer.com';
  private readonly webClient: WebClient = new WebClient(this.baseUrl);

  constructor(private readonly key: string, private readonly secret: string) {}

  async sendChildOrder(request: SendChildOrderRequest): Promise<SendChildOrderResponse> {
    const path = '/v1/me/sendchildorder';
    return new SendChildOrderResponse(await this.post<SendChildOrderResponse, SendChildOrderRequest>(path, request));
  }

  async cancelChildOrder(request: CancelChildOrderRequest): Promise<CancelChildOrderResponse> {
    const path = '/v1/me/cancelchildorder';
    return await this.post<CancelChildOrderResponse, CancelChildOrderRequest>(path, request);
  }

  async getChildOrders(param: ChildOrdersParam): Promise<ChildOrdersResponse> {
    const path = '/v1/me/getchildorders';
    const response = await this.get<ChildOrdersResponse, ChildOrdersParam>(path, param);
    return response.map(x => new ChildOrder(x));
  }

  async getExecutions(param: ExecutionsParam): Promise<ExecutionsResponse> {
    const path = '/v1/me/getexecutions';
    const response = await this.get<ExecutionsResponse, ExecutionsParam>(path, param);
    return response.map(x => new Execution(x));
  }

  async getPositions(): Promise<PositionsResponse> {
    const path = '/v1/me/getpositions?product_code=FX_BTC_JPY';
    const response = await this.get<PositionsResponse>(path);
    return response.map(x => new FXPosition(x));
  }

  async getBoard(): Promise<BoardResponse> {
    const path = '/v1/board?product_code=FX_BTC_JPY';
    return new BoardResponse(await this.webClient.fetch<BoardResponse>(path, undefined, false));
  }

  private async call<R>(path: string, method: string, body: string = ''): Promise<R> {
    const n = nonce();
    const message = n + method + path + body;
    const sign = hmac(this.secret, message);
    const headers = {
      'Content-Type': 'application/json',
      'ACCESS-KEY': this.key,
      'ACCESS-TIMESTAMP': n,
      'ACCESS-SIGN': sign
    };
    const init = { method, headers, body };
    return await this.webClient.fetch<R>(path, init);
  }

  private async post<R, T>(path: string, requestBody: T): Promise<R> {
    const method = 'POST';
    const body = JSON.stringify(requestBody);
    return await this.call<R>(path, method, body);
  }

  private async get<R, T = never>(path: string, requestParam?: T): Promise<R> {
    const method = 'GET';
    let pathWithParam = path;
    if (requestParam) {
      const param = safeQueryStringStringify(requestParam);
      pathWithParam += `?${param}`;
    }
    return await this.call<R>(pathWithParam, method);
  }
}
