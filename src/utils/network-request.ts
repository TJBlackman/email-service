interface INetworkResponse {
  success: boolean;
  message: string;
  data?: any;
}

interface INetworkRequestOptions {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: object;
  body?: object;
  before?: () => void;
  success?: (json: INetworkResponse) => void;
  error?: (error: INetworkResponse) => void;
  after?: () => void;
  latency?: number;
}

export const networkRequest = (options: INetworkRequestOptions) => {
  const {
    url,
    method = 'GET',
    headers,
    body,
    before = () => { },
    success = (json) => undefined,
    error = (err) => undefined,
    after = () => { },
    latency = 0
  } = options;


  const final_headers = (() => {
    const header_options = {
      "Content-Type": "application/json",
      ...headers
    };
    return header_options;
  })();


  before();


  fetch(url, {
    method,
    headers: final_headers,
    body: JSON.stringify(body)
  })
    .then(response => response.json())
    .then((json: INetworkResponse) => {
      setTimeout(() => {
        if (json.success) {
          success(json);
          after();
        } else {
          error(json);
          after();
        }
      }, latency)
    })
    .catch(err => {
      error(err);
      after();
    })
};