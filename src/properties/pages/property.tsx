import type { ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router-dom';
import { BookingCreateForm } from '~/bookings/components/booking-create-form';
import { Button } from '~/commons/components/button';
import { Separator } from '~/commons/components/separator';
import { PropertyBookingList } from '../components/property-booking-list';
import { PropertyThumbnail } from '../components/property-thumbnail';
import { useProperty } from '../hooks/user-property';

export function Property(): ReactNode {
  const { propertyId } = useParams();

  const propertyREs = useProperty(propertyId);

  if (propertyREs.error != null) {
    return (
      <div className="flex flex-col items-center gap-4 md:gap-6">
        <p
          className="text-center text-sm text-muted-foreground"
          data-testid="error-message"
        >
          <FormattedMessage
            id="loadPropertiesFailure"
            defaultMessage="There was an error while loading this page."
          />
        </p>
        <Button data-testid="reload-button" onClick={window.location.reload}>
          <FormattedMessage id="Reload" defaultMessage="Reload" />
        </Button>
      </div>
    );
  }

  const property = propertyREs.data?.property;

  if (property == null) return null;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-5 md:gap-6">
      <div className="md:col-span-3">
        <PropertyThumbnail property={property} />
      </div>
      <div className="flex flex-col gap-4 md:col-span-2 md:row-span-3 md:gap-6">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          {property.name}
        </h2>
        <div className="flex flex-col gap-4 md:gap-6">
          <BookingCreateForm property={property} />
          <Separator />
          <h3 className="scroll-m-20 text-lg font-semibold tracking-tight">
            <FormattedMessage
              id="Your bookings for"
              defaultMessage="Your bookings for"
            />{' '}
            {property.name}
          </h3>
          <PropertyBookingList property={property} />
        </div>
      </div>
      <div className="md:col-span-3">
        <p className="my-4 text-muted-foreground">{property.description}</p>
      </div>
    </div>
  );
}
