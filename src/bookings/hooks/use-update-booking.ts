import type { FetchError, FetchKey } from '~/commons/utils/fetcher';
import { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';
import { fetchJSON, getURLFromKey, isFetchKey } from '~/commons/utils/fetcher';

type Body = {
  from: string;
  to: string;
};

export function useUpdateBooking(id?: string) {
  const url = getKey(id);
  return useSWRMutation<void, FetchError, FetchKey | null, Body>(
    url,
    deleteBooking,
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
          undefined,
          { revalidate: true },
        );
      },
    },
  );
}

function getKey(id?: string): FetchKey | null {
  if (id == null) return null;
  return { path: `/api/bookings/${id}`, params: {} };
}

async function deleteBooking(
  key: FetchKey,
  { arg }: { arg: Body },
): Promise<void> {
  const url = getURLFromKey(key);
  await fetchJSON(url, { method: 'PATCH', body: JSON.stringify(arg) });
}
