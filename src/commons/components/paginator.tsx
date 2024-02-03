import type { ReactNode } from 'react';
import {
  Pagination,
  PaginationButton,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from './pagination';

type PaginatorProps = {
  count: number;
  offset: number;
  limit: number;
  onChange: (offset: number) => void;
};

export function Paginator(props: PaginatorProps): ReactNode {
  const { count, offset, limit, onChange } = props;

  // const pages = Math.ceil(count / limit);
  const page = offset / limit + 1;

  const isFirst = offset === 0;
  const isLast = offset + limit >= count;

  const handlePreviousClick = () => {
    onChange(offset - limit);
  };

  const handleNextClick = () => {
    onChange(offset + limit);
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            disabled={isFirst}
            onClick={handlePreviousClick}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationButton isActive>{page}</PaginationButton>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext disabled={isLast} onClick={handleNextClick} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
