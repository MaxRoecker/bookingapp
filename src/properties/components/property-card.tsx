import type { Property } from '../typings';
import type { ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/commons/components/card';
import { PropertyRating } from './property-rating';
import { PropertyThumbnail } from './property-thumbnail';
import { PropertyValue } from './property-value';

export type PropertyCardProps = {
  property: Property;
};

export function PropertyCard(props: PropertyCardProps): ReactNode {
  const { property } = props;
  return (
    <Card
      className="transition-shadow hover:shadow-lg"
      data-testid="property-card"
    >
      <CardHeader className="flex flex-col">
        <PropertyThumbnail className="mb-2" property={property} />
        <div className="flex flex-row items-center justify-between">
          <CardTitle data-testid="property-card-title">
            {property.name}
          </CardTitle>
          <PropertyRating property={property} />
        </div>
        <CardDescription>
          <PropertyValue property={property} />{' '}
          <FormattedMessage id="night" defaultMessage="night" />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p
          className="m-0 line-clamp-2 text-pretty text-sm leading-5 text-muted-foreground"
          data-testid="property-card-description"
        >
          {property.description}
        </p>
      </CardContent>
    </Card>
  );
}
