import type { FetchError, FetchKey } from '~/commons/utils/fetcher';
import { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';
import { fetchJSON, getURLFromKey, isFetchKey } from '~/commons/utils/fetcher';

type Body = {
  propertyId: string;
  from: string;
  to: string;
};

export function useCreateBooking() {
  const url = getKey();
  return useSWRMutation<void, FetchError, FetchKey | null, Body>(
    url,
    createBooking,
    {
      revalidate: false,
      onSuccess() {
        mutate(
          (key) => {
            if (!isFetchKey(key)) return false;
            return (
              /\/api\/bookings.*/.test(key.path) ||
              /\/api\/properties\/.*\/bookings.*/.test(key.path)
            );
          },
          null,
          { revalidate: true },
        );
      },
    },
  );
}

function getKey(): FetchKey | null {
  return { path: `/api/bookings`, params: {} };
}

async function createBooking(
  key: FetchKey,
  { arg }: { arg: Body },
): Promise<void> {
  const url = getURLFromKey(key);
  await fetchJSON(url, { method: 'post', body: JSON.stringify(arg) });
}
