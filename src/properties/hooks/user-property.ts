import type { Property } from '../typings';
import type { FetchError, FetchKey } from '~/commons/utils/fetcher';
import useSWR from 'swr';
import { fetchJSON, getURLFromKey } from '~/commons/utils/fetcher';

type Data = { property: Property };

export function useProperty(id?: string) {
  const key = getKey(id);
  return useSWR<Data, FetchError, FetchKey | null>(key, fetchProperty);
}

function getKey(id?: string): FetchKey | null {
  if (id == null) return null;
  return { path: `/api/properties/${id}`, params: {} };
}

async function fetchProperty(key: FetchKey): Promise<Data> {
  const url = getURLFromKey(key);
  const json = await fetchJSON(url, { method: 'get' });
  return json as Data;
}
