import type { Booking } from '../typings';
import type { ButtonProps } from '~/commons/components/button';
import type { Property } from '~/properties/typings';
import { Cross1Icon, UpdateIcon } from '@radix-ui/react-icons';
import { isAfter, startOfTomorrow } from 'date-fns';
import { forwardRef } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '~/commons/components/alert-dialog';
import { Button } from '~/commons/components/button';
import { toast } from '~/commons/hooks/use-toast';
import { usePropertyBookings } from '~/properties/hooks/user-property-bookings';
import { useUpdateBooking } from '../hooks/use-update-booking';
import { BookingForm } from './booking-form';

type BookingUpdateButtonProps = Omit<ButtonProps, 'property'> & {
  property: Property;
  booking: Booking;
};

export const BookingUpdateButton = forwardRef<
  HTMLButtonElement,
  BookingUpdateButtonProps
>((props, ref) => {
  const { booking, property, children, ...rest } = props;

  const intl = useIntl();

  const updateRes = useUpdateBooking(booking.id);

  const bookingsRes = usePropertyBookings({
    id: property.id,
    to: startOfTomorrow(),
  });

  const allBookings = bookingsRes.data?.bookings ?? [];

  // Remove self-referencing bookings
  const bookings = allBookings.filter((b) => b.id !== booking.id);

  const busy = bookingsRes.data?.bookings == null || updateRes.isMutating;

  const disabled = updateRes.isMutating || isAfter(Date.now(), booking.from);

  const handleSubmit = (range: { from: Date; to: Date }) => {
    const json = {
      from: range.from.toISOString(),
      to: range.to.toISOString(),
    };
    // console.log(json);
    updateRes
      .trigger(json)
      .then(() => {
        toast({
          title: intl.formatMessage({
            id: 'Success',
            defaultMessage: 'Success',
          }),
          description: intl.formatMessage({
            id: 'updateSuccessDescription',
            defaultMessage: 'Your booking was update',
          }),
        });
        return;
      })
      .catch((error) => {
        console.error(error);
        toast({
          title: intl.formatMessage({
            id: 'Oops',
            defaultMessage: 'Oops…',
          }),
          description: intl.formatMessage({
            id: 'updateFailureDescription',
            defaultMessage: 'Your booking was not updated',
          }),
        });
        return;
      });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          ref={ref}
          disabled={disabled}
          data-testid="booking-update-button"
          {...rest}
        >
          <UpdateIcon height="1.5em" width="1.5em" />
          {children}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent data-testid="booking-update-dialog">
        <AlertDialogHeader>
          <div className="flex flex-row items-center justify-between gap-2">
            <AlertDialogTitle className="truncate text-left">
              <FormattedMessage
                id="updateDialog.title"
                defaultMessage="Update Booking"
              />
            </AlertDialogTitle>
            <AlertDialogCancel>
              <Cross1Icon width="1.5em" height="1.5em" />
            </AlertDialogCancel>
          </div>
        </AlertDialogHeader>
        <BookingForm
          property={property}
          bookings={bookings}
          busy={busy}
          defaultValue={{
            from: new Date(booking.from),
            to: new Date(booking.to),
          }}
          onSubmit={handleSubmit}
        />
        {/* <AlertDialogFooter>
          <AlertDialogCancel data-testid="booking-delete-dialog-cancel">
            <FormattedMessage id="Close" defaultMessage="Close" />
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleClick}
            data-testid="booking-delete-dialog-confirm"
          >
            <FormattedMessage
              id="Cancel Booking"
              defaultMessage="Cancel Booking"
            />
          </AlertDialogAction>
        </AlertDialogFooter> */}
      </AlertDialogContent>
    </AlertDialog>
  );
});
