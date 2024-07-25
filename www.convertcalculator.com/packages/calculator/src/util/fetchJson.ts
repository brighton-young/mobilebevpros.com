type FetchJsonOptions = {
  url: string;
  method?: 'GET' | 'POST' | 'PUT';
  data?: Record<string, unknown>;
  headers?: Record<string, string>;
};

const fetchJson = async <T>({
  url,
  method = 'GET',
  data = {},
  headers = {},
}: FetchJsonOptions): Promise<T> => {
  const response = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json', ...headers },
    ...((method === 'POST' || method === 'PUT') && {
      body: JSON.stringify(data),
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new FetchJsonError(
      result.message || response.statusText,
      response.status,
      result.data,
    );
  }

  return result as T;
};

class FetchJsonError extends Error {
  status: number;

  data: Record<string, unknown>;

  constructor(message: string, status: number, data: Record<string, unknown>) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

export default fetchJson;
