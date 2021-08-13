export enum HttpResponses {
  'SUCCESS' = 'SUCCESS',
}
export class MinimalHTTPResponse {
  status: number;
  message: string;
  error?: object | string;
}
