export type MethodParams<T> = T;

export interface BaseReq<T = any> {
  jsonrpc: string;
  method: string;
  params: MethodParams<T>;
  uuid: string | null;
  id: string | null;
}

export interface EdulinkApiResponse<T = any> {
  jsonrpc: string;
  result: T & {
    success: boolean;
    method: string;
    error?: string;
    metrics: {
        st: string;
        sspt: number;
        sspt_us: number;
        uniqid: string;
        be: string;
    };
  };
  uuid: string | null;
  id: string | null;
}

export type ApiRequest<M extends string, P> = BaseReq & {
  method: M;
  params: MethodParams<P>;
};