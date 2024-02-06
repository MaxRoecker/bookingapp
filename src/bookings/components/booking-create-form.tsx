import type { ReactNode } from 'react';
import type { Property } from '~/properties/typings';
import { startOfTomorrow } from 'date-fns';
import { useIntl } from 'react-intl';
import { toast } from '~/commons/hooks/use-toast';
import { usePropertyBookings } from '~/properties/hooks/user-property-bookings';
import { useCreateBooking } from '../hooks/use-create-booking';
import { BookingForm } from './booking-form';

type BookingCreateFormProps = {
  property: Property;
};

export function BookingCreateForm(props: BookingCreateFormProps): ReactNode {
  const { property } = props;

  const intl = useIntl();

  const createRes = useCreateBooking();

  const bookingsRes = usePropertyBookings({
    id: property.id,
    to: startOfTomorrow(),
  });

  const bookings = bookingsRes.data?.bookings ?? [];

  const busy = bookingsRes.data?.bookings == null || createRes.isMutating;

  const handleSubmit = (range: { from: Date; to: Date }) => {
    const json = {
      propertyId: property.id,
      from: range.from.toISOString(),
      to: range.to.toISOString(),
    };
    createRes
      .trigger(json)
      .then(() => {
        toast({
          title: intl.formatMessage({
            id: 'Success',
            defaultMessage: 'Success',
          }),
          description: intl.formatMessage({
            id: 'createSuccessDescription',
            defaultMessage: 'Your booking was created',
          }),
        });
        return;
      })
      .catch(() => {
        toast({
          title: intl.formatMessage({
            id: 'Oops',
            defaultMessage: 'Oops…',
          }),
          description: intl.formatMessage({
            id: 'createFailureDescription',
            defaultMessage: 'Your booking was not created',
          }),
        });
        return;
      });
  };

  return (
    <BookingForm
      property={property}
      bookings={bookings}
      busy={busy}
      onSubmit={handleSubmit}
    />
  );
}
