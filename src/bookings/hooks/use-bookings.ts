import type { Booking } from '../typings';
import type { FetchError, FetchKey } from '~/commons/utils/fetcher';
import type { Property } from '~/properties/typings';
import useSWR from 'swr';
import { fetchJSON, getURLFromKey } from '~/commons/utils/fetcher';

type UseBookingsOptions = {
  offset: number;
  limit: number;
};

type Data = {
  bookings: Array<{
    booking: Booking;
    property: Property;
  }>;
  offset: number;
  limit: number;
  count: number;
};

export function useBookings(options: UseBookingsOptions) {
  const key = getKey(options);
  return useSWR<Data, FetchError, FetchKey | null>(key, fetchBookings);
}

function getKey(options: UseBookingsOptions): FetchKey | null {
  const params: FetchKey['params'] = {};
  if (Number.isInteger(options.offset)) {
    params['offset'] = [options.offset.toString(10)];
  }
  if (Number.isInteger(options.limit)) {
    params['limit'] = [options.limit.toString(10)];
  }
  return { path: '/api/bookings', params };
}

async function fetchBookings(key: FetchKey): Promise<Data> {
  const url = getURLFromKey(key);
  const json = await fetchJSON(url, { method: 'get' });
  return json as Data;
}
