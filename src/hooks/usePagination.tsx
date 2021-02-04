import { useState } from 'react';

type IPaginationType = (
  totalPages?: number | null
) => {
  page: number;
  Pagination: React.FC;
};

export const usePagination: IPaginationType = (totalPages) => {
  const [page, setPage] = useState(1);
  const onClickPrevPage = () => setPage((current) => current - 1);
  const onClickNextPage = () => setPage((current) => current + 1);

  const Pagination: React.FC = () => (
    <div className='grid grid-cols-3 max-w-xs text-center items-center mx-auto my-10'>
      <button
        disabled={page === 1}
        className='pagination'
        onClick={onClickPrevPage}>
        &larr;
      </button>
      <span>
        Page {page} of {totalPages || 1}
      </span>
      <button
        disabled={page === (totalPages || 1)}
        className='pagination'
        onClick={onClickNextPage}>
        &rarr;
      </button>
    </div>
  );
  return { page, Pagination };
};
