import type { Booking } from '../typings';
import type { ReactNode } from 'react';
import type { Property } from '~/properties/typings';
import { FormattedDateTimeRange, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { Button } from '~/commons/components/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/commons/components/card';
import { PropertyThumbnail } from '~/properties/components/property-thumbnail';
import { BookingDeleteButton } from './booking-delete-button';
import { BookingValue } from './booking-value';
import { BookingValueExtended } from './booking-value-extended';

export type BookingCardProps = {
  booking: Booking;
  property: Property;
};

export function BookingCard(props: BookingCardProps): ReactNode {
  const { booking, property } = props;
  return (
    <Card>
      <CardHeader
        className="flex flex-col gap-4 md:flex-row md:gap-6 md:p-6"
        data-testid="booking-card"
      >
        <PropertyThumbnail
          className="m-0 shrink-0 md:w-1/5 lg:w-1/6"
          property={property}
        />
        <div className="flex w-full flex-row items-center justify-between gap-4">
          <div className="flex shrink flex-col">
            <CardTitle className="truncate" data-testid="booking-card-title">
              <Link to={`/properties/${property.id}`}>{property.name}</Link>
            </CardTitle>
            <CardDescription className="truncate">
              <FormattedDateTimeRange
                from={new Date(booking.from)}
                to={new Date(booking.to)}
                year="numeric"
                month="long"
                day="numeric"
              />
              <br />
              <BookingValue booking={booking} property={property} /> (
              <BookingValueExtended booking={booking} property={property} />)
            </CardDescription>
          </div>
          <BookingDeleteButton
            booking={booking}
            className="shrink-0 gap-1 sm:hidden"
            variant="destructive"
            icon
          />
          <div className="hidden shrink-0 flex-col gap-5 sm:flex">
            <BookingDeleteButton
              className="gap-1"
              booking={booking}
              variant="destructive"
            >
              <FormattedMessage
                id="Cancel Booking"
                defaultMessage="Cancel Booking"
              />
            </BookingDeleteButton>
            <Button asChild variant="outline">
              <Link to={`/properties/${property.id}`}>
                <FormattedMessage
                  id="Property details"
                  defaultMessage="Property details"
                />
              </Link>
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
