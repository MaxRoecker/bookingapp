import type { Property } from '../typings';
import type { ImgHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { cn } from '~/commons/utils/classnames';

type PropertyThumbnailProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  'property' | 'children' | 'src' | 'srcSet'
> & {
  property: Property;
};

export const PropertyThumbnail = forwardRef<
  HTMLImageElement,
  PropertyThumbnailProps
>((props, ref) => {
  const { className, property, ...rest } = props;
  return (
    <img
      ref={ref}
      className={cn(
        `aspect-[1.333] w-full rounded-md bg-muted object-cover`,
        className,
      )}
      src={property.thumbnail}
      data-testid="property-thumbnail"
      {...rest}
    />
  );
});

PropertyThumbnail.displayName = 'PropertyThumbnail';
