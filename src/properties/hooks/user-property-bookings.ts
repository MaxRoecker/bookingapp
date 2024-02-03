import type { Booking } from '~/bookings/typings';
import type { FetchError, FetchKey } from '~/commons/utils/fetcher';
import useSWR from 'swr';
import { fetchJSON, getURLFromKey } from '~/commons/utils/fetcher';

type UsePropertyBookingsProps = {
  id?: string;
  to?: Date;
};

type Data = { bookings: Array<Booking> };

export function usePropertyBookings(options: UsePropertyBookingsProps = {}) {
  const key = getKey(options);
  return useSWR<Data, FetchError, FetchKey | null>(key, fetchPropertyBookings);
}

function getKey(options: UsePropertyBookingsProps): FetchKey | null {
  const id = options.id;
  if (id == null) return null;
  if ('to' in options && options.to == null) return null;
  const params: FetchKey['params'] = {};
  if (options.to != null) {
    params['to'] = [options.to.toISOString()];
  }
  return { path: `/api/properties/${id}/bookings`, params };
}

async function fetchPropertyBookings(key: FetchKey): Promise<Data> {
  const url = getURLFromKey(key);
  const json = await fetchJSON(url, { method: 'get' });
  return json as Data;
}
