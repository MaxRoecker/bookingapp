import type { Property } from '../typings';
import type { HTMLAttributes } from 'react';
import { StarFilledIcon } from '@radix-ui/react-icons';
import { forwardRef } from 'react';
import { FormattedNumber } from 'react-intl';
import { cn } from '~/commons/utils/classnames';

type PropertyValueProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'property' | 'children'
> & {
  property: Property;
};

export const PropertyRating = forwardRef<HTMLDivElement, PropertyValueProps>(
  (props, ref) => {
    const { className, property, ...rest } = props;
    return (
      <div
        ref={ref}
        className={cn('flex flex-row items-center leading-none', className)}
        data-testid="property-rating"
        {...rest}
      >
        <StarFilledIcon className="inline-block" width="1em" height="1em" />
        &nbsp;
        <FormattedNumber
          value={property.rating / 100}
          style="decimal"
          minimumFractionDigits={2}
          maximumFractionDigits={2}
        />
      </div>
    );
  },
);

PropertyRating.displayName = 'PropertyRating';
