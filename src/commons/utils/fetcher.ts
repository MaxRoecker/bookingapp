export type FetchKey = {
  path: string;
  params: {
    [name: string]: Array<string>;
  };
};

export function isFetchKey(value: unknown): value is FetchKey {
  return (
    value != null &&
    typeof value === 'object' &&
    'path' in value &&
    typeof value.path === 'string' &&
    'params' in value &&
    typeof value.params === 'object'
  );
}

export function getURLFromKey(key: FetchKey): URL {
  const url = new URL(key.path, import.meta.env.VITE_ROOT_URL);
  for (const name in key.params) {
    if (Object.prototype.hasOwnProperty.call(key.params, name)) {
      const values = key.params[name];
      for (const value of values) {
        url.searchParams.append(name, value);
      }
    }
  }
  return url;
}

export type FetchErrorInit = {
  status: number;
  statusText: string;
  message: string;
};

export class FetchError extends Error {
  public readonly status: number;
  public readonly statusText: string;

  constructor(init: FetchErrorInit, options?: ErrorOptions) {
    // const message =
    //   init.status === 0
    //     ? `An error ocurred while fetching data`
    //     : `An error ocurred after the data was fetched`;
    super(init.message, options);
    this.status = init.status;
    this.statusText = init.statusText;
    this.name = 'FetchError';
  }
}

export async function fetchJSON(
  ...args: Parameters<typeof fetch>
): Promise<unknown> {
  let data: unknown;
  let error: FetchError | undefined;
  try {
    const response = await fetch(...args);
    data = await response.json();
    if (!response.ok) {
      const { status, statusText } = response;
      const message = hasMessage(data) ? data['message'] : '';
      error = new FetchError({ message, status, statusText });
    }
  } catch (cause) {
    const status = 0;
    const statusText = 'NetworkError';
    const message = `An error occurred while fetching the data`;
    error = error = new FetchError({ status, statusText, message }, { cause });
  }

  if (error != null) throw error;

  return data;
}

function hasMessage(value: unknown): value is { message: string } {
  return (
    typeof value === 'object' &&
    value != null &&
    'message' in value &&
    typeof value['message'] === 'string'
  );
}
