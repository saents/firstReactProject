import React from 'react';
import { useGetPagesArray } from '../../../hooks/useGetPagesArray';

const Pagintation = ({totalPages, page, changePage}) => {
  let pagesArray = useGetPagesArray(totalPages);

  return (
    <div className='page__wrapper'>
          {pagesArray.map((p) => (
            <span
              onClick={() => changePage(p)}
              key={p}
              className={page === p ? "page page__curent" : "page"}>
              {p}
            </span>
          ))}
        </div>
  );
};

export default Pagintation;