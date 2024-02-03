import type { ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button } from '~/commons/components/button';
import { PropertyGrid } from '../components/property-grid';
import { useProperties } from '../hooks/use-properties';

export function Properties(): ReactNode {
  const { data, error } = useProperties();

  if (error != null) {
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

  return data == null ? null : <PropertyGrid properties={data.properties} />;
}
