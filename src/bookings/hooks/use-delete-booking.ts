import type { FetchError, FetchKey } from '~/commons/utils/fetcher';
import { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';
import { fetchJSON, getURLFromKey, isFetchKey } from '~/commons/utils/fetcher';

export function useDeleteBooking(id?: string) {
  const url = getKey(id);
  return useSWRMutation<void, FetchError, FetchKey | null>(url, deleteBooking, {
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
  });
}

function getKey(id?: string): FetchKey | null {
  if (id == null) return null;
  return { path: `/api/bookings/${id}`, params: {} };
}

async function deleteBooking(key: FetchKey): Promise<void> {
  const url = getURLFromKey(key);
  await fetchJSON(url, { method: 'delete' });
}
