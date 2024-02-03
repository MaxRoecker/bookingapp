import type { Property } from '../typings';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { FormattedNumber } from 'react-intl';
import { cn } from '~/commons/utils/classnames';

type PropertyValueProps = Omit<
  HTMLAttributes<HTMLElement>,
  'property' | 'children'
> & {
  property: Property;
};

export const PropertyValue = forwardRef<HTMLElement, PropertyValueProps>(
  (props, ref) => {
    const { className, property, ...rest } = props;
    return (
      <strong
        ref={ref}
        className={cn('font-semibold', className)}
        data-testid="property-value"
        {...rest}
      >
        <FormattedNumber
          value={property.value / 100}
          style="currency"
          currency="USD"
          minimumFractionDigits={2}
          maximumFractionDigits={2}
        />
      </strong>
    );
  },
);

PropertyValue.displayName = 'PropertyValue';
