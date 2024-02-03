import type { Property } from '../typings';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { PropertyCard } from './property-card';

export type PropertyGridProps = {
  properties: Array<Property>;
};

export function PropertyGrid(props: PropertyGridProps): ReactNode {
  const { properties } = props;
  return (
    <div
      className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3"
      data-testid="property-grid"
    >
      {properties.map((property) => (
        <Link key={property.id} to={`properties/${property.id}`}>
          <PropertyCard property={property} />
        </Link>
      ))}
    </div>
  );
}
