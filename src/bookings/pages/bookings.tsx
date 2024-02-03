import type { ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSearchParams } from 'react-router-dom';
import { Button } from '~/commons/components/button';
import { Paginator } from '~/commons/components/paginator';
import { BookingGrid } from '../components/booking-grid';
import { useBookings } from '../hooks/use-bookings';

export function Bookings(): ReactNode {
  const [searchParams, setSearchParams] = useSearchParams();

  const offset = Number.parseInt(searchParams.get('offset') ?? '0');
  const limit = Number.parseInt(searchParams.get('limit') ?? '3');

  const response = useBookings({ limit, offset });

  const handlePaginatorChange = (offset: number) => {
    const params = new URLSearchParams(searchParams);
    if (!Number.isInteger(offset) || offset === 0) {
      params.delete('offset');
    } else {
      params.set('offset', offset.toString(10));
    }
    setSearchParams(params);
  };

  if (response.error != null) {
    return (
      <div className="flex flex-col items-center gap-8 md:gap-12">
        <p
          className="text-center text-sm text-muted-foreground"
          data-testid="error-message"
        >
          <FormattedMessage
            id="loadBookingsFailure"
            defaultMessage="There was an error while loading the bookings."
          />
        </p>
        <Button data-testid="reload-button" onClick={window.location.reload}>
          <FormattedMessage id="Reload" defaultMessage="Reload" />
        </Button>
      </div>
    );
  }

  const data = response.data;

  return data == null ? null : (
    <div className="flex flex-col gap-8 md:gap-12">
      <BookingGrid bookings={data.bookings} />
      <Paginator
        count={data.count}
        offset={data.offset}
        limit={data.limit}
        onChange={handlePaginatorChange}
      />
    </div>
  );
}
