import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/20/solid';
import {PaginationType} from '@interfaces/common';
import {useMemo} from 'react';

interface IPagination {
  pagination: PaginationType;
  setPage: (x: number) => void;
  currentPage: number;
}

export const Pagination = ({pagination, currentPage, setPage}: IPagination) => {
  const {page, pageCount, total, pageSize} = pagination;
  const disableNext = currentPage >= pageCount;
  const disablePrev = currentPage <= 1;

  const pageNumbers = useMemo(() => {
    //stole from here https://github.com/etchteam/next-pagination/blob/master/src/lib/get-page-numbers.ts
    const pageNumbersToShow = 4;
    const lastPageNumber = Math.ceil(total / pageSize);
    const currentPageNumber =
      currentPage <= lastPageNumber ? currentPage : lastPageNumber;
    const maxPagesBeforeCurrentPage = Math.floor(pageNumbersToShow / 2);
    const maxPagesAfterCurrentPage = Math.ceil(pageNumbersToShow / 2) - 1;
    let startPage = 1;
    let endPage = lastPageNumber;

    if (lastPageNumber <= 1) {
      return []; // Don't show numbers if there's only 1 page
    }

    if (currentPageNumber <= maxPagesBeforeCurrentPage) {
      // near the start
      startPage = 1;
      endPage = pageNumbersToShow;
    } else if (currentPageNumber + maxPagesAfterCurrentPage >= lastPageNumber) {
      // near the end
      startPage = lastPageNumber - pageNumbersToShow + 1;
    } else {
      // somewhere in the middle
      startPage = currentPageNumber - maxPagesBeforeCurrentPage;
      endPage = currentPageNumber + maxPagesAfterCurrentPage;
    }

    let pageNumbers: (string | number)[] = Array.from(
      Array(endPage + 1 - startPage).keys(),
    )
      .map(pageNumber => startPage + pageNumber)
      .filter(pageNumber => pageNumber <= lastPageNumber && pageNumber > 0);

    if (pageNumbers[0] > 1) {
      if (pageNumbers[0] <= 2) {
        pageNumbers = [1, ...pageNumbers];
      } else {
        const ellipsis = pageNumbers[0] > 3 ? '...' : 2;
        pageNumbers = [1, ellipsis, ...pageNumbers];
      }
    }

    if (pageNumbers[pageNumbers.length - 1] !== lastPageNumber) {
      if (pageNumbers[pageNumbers.length - 1] === lastPageNumber - 1) {
        pageNumbers = [...pageNumbers, lastPageNumber];
      } else {
        const ellipsis =
          pageNumbers[pageNumbers.length - 1] < lastPageNumber - 2
            ? '...'
            : lastPageNumber - 1;
        pageNumbers = [...pageNumbers, ellipsis, lastPageNumber];
      }
    }

    return pageNumbers;
  }, [currentPage, pageSize, total]);

  const handleNext = () => {
    if (disableNext) {
      return;
    }
    setPage(page + 1);
  };

  const handlePrev = () => {
    if (disablePrev) {
      return;
    }
    setPage(page - 1);
  };

  if (pageCount <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 pb-12">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={handlePrev}
          disabled={disablePrev}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={disableNext}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{page}</span> to{' '}
            <span className="font-medium">{pageCount}</span> of{' '}
            <span className="font-medium">{total}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination">
            <button
              onClick={handlePrev}
              disabled={disablePrev}
              className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            {pageNumbers.map((pageNumber, i) =>
              typeof pageNumber !== 'number' ? (
                <div
                  key={i}
                  className="relative inline-flex items-center border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
                  &hellip;
                </div>
              ) : (
                <div
                  key={i}
                  className={`cursor-pointer relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 ${
                    pageNumber === currentPage
                      ? 'border-primary bg-indigo-50 z-10'
                      : ''
                  }`}
                  onClick={() => {
                    console.log({
                      pageNumber,
                      i: pageNumber,
                    });
                    setPage(pageNumber);
                  }}>
                  {pageNumber}
                </div>
              ),
            )}
            <button
              onClick={handleNext}
              disabled={disableNext}
              className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};
