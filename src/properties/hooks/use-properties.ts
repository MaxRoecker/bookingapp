import type { Property } from '../typings';
import type { FetchError, FetchKey } from '~/commons/utils/fetcher';
import useSWR from 'swr';
import { fetchJSON, getURLFromKey } from '~/commons/utils/fetcher';

type UsePropertiesOptions = {
  ids?: Array<string>;
};

type Data = { properties: Array<Property> };

export function useProperties(options: UsePropertiesOptions = {}) {
  const key = getKey(options);
  return useSWR<Data, FetchError, FetchKey | null>(key, fetchProperties);
}

function getKey(options: UsePropertiesOptions): FetchKey | null {
  if ('ids' in options && options.ids == null) return null;
  return {
    path: '/api/properties',
    params: { ids: options.ids ?? [] },
  };
}

async function fetchProperties(key: FetchKey): Promise<Data> {
  const url = getURLFromKey(key);
  const json = await fetchJSON(url, { method: 'get' });
  return json as Data;
}
