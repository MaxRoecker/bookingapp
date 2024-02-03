import type { Booking } from '../typings';
import type { MouseEvent } from 'react';
import type { ButtonProps } from '~/commons/components/button';
import { TrashIcon, UpdateIcon } from '@radix-ui/react-icons';
import { isAfter } from 'date-fns';
import { forwardRef } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '~/commons/components/alert-dialog';
import { Button } from '~/commons/components/button';
import { useToast } from '~/commons/hooks/use-toast';
import { useDeleteBooking } from '../hooks/use-delete-booking';

type PropertyValueProps = ButtonProps & {
  booking: Booking;
};

export const BookingDeleteButton = forwardRef<
  HTMLButtonElement,
  PropertyValueProps
>((props, ref) => {
  const { booking, onClick, children, ...rest } = props;
  const { trigger, isMutating } = useDeleteBooking(booking.id);
  const intl = useIntl();
  const { toast } = useToast();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (onClick != null) onClick(event);
    trigger()
      .then(() => {
        toast({
          title: intl.formatMessage({
            id: 'Success',
            defaultMessage: 'Success',
          }),
          description: intl.formatMessage({
            id: 'cancelSuccessDescription',
            defaultMessage: 'Your booking was cancelled',
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
            id: 'cancelFailureDescription',
            defaultMessage: 'There was a problem with this cancelling',
          }),
        });
      });
  };

  const icon = isMutating ? (
    <UpdateIcon className="animate-spin" height="1.5em" width="1.5em" />
  ) : (
    <TrashIcon height="1.5em" width="1.5em" />
  );

  const disabled = isMutating || isAfter(Date.now(), booking.from);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          ref={ref}
          disabled={disabled}
          data-testid="booking-delete-button"
          {...rest}
        >
          {icon}
          {children}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent data-testid="booking-delete-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle>
            <FormattedMessage
              id="deleteDialog.title"
              defaultMessage="Are you sure?"
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            <FormattedMessage
              id="deleteDialog.description"
              defaultMessage="This action cannot be undone."
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
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
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
});

BookingDeleteButton.displayName = 'BookingDeleteButton';
