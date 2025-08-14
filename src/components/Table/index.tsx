import { useAppDispatch, useAppSelector } from '@/store';
import { setPage, setPageSize } from '@/store/modules/user';
import { useLayoutEffect } from 'react';
import { Icon } from '../Icon';
import { Spinner } from '../Spinner';
import styles from './styles.module.scss';

type HeaderItem = { key: string; label: string };
// type TableItem = Record<string, ReactNode>;

type Props = {
  headers: HeaderItem[];
  // items: TableItem[];
  module: 'user';
};

export function Table(props: Props) {
  const dispatch = useAppDispatch();
  const userModule = useAppSelector((state) => state[props.module]);
  const { page, pageSize, total } = userModule.pagination;

  useLayoutEffect(() => {
    // add debounce fn
    const handler = setTimeout(() => {
      console.log(page, pageSize);
    }, 100);

    return () => {
      clearTimeout(handler);
    };
  }, [pageSize, page]);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const canPrev = page > 0;
  const canNext = page < totalPages - 1;

  const from = total === 0 ? 0 : page * pageSize + 1;
  const to = Math.min(total, (page + 1) * pageSize);

  const handlePageChange = (p: number) => {
    dispatch(setPage(p));
  };
  const handlePageSizeChange = (p: number) => {
    dispatch(setPageSize(p));
  };

  const handlePrev = () => handlePageChange(clamp(page - 1, 0, totalPages - 1));
  const handleNext = () => handlePageChange(clamp(page + 1, 0, totalPages - 1));

  if (userModule.loading) {
    return <Spinner />;
  }

  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            {props.headers.map((item) => (
              <th key={item.key}>{item.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {userModule.list.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {props.headers.map((header, headerIndex) => (
                <td key={headerIndex}>
                  {typeof row[header.key as keyof typeof row] === 'boolean' ? (
                    <Icon
                      name={row[header.key as keyof typeof row] ? 'circleCheck' : 'circleX'}
                      size={16}
                      color={row[header.key as keyof typeof row] ? 'green' : 'red'}
                    />
                  ) : (
                    row[header.key as keyof typeof row] || 'N/A'
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.paginationContainer}>
        <div className='tbl-page-buttons'>
          <button className='tbl-btn' onClick={() => handlePageChange(0)} disabled={!canPrev} aria-label='First page'>
            «
          </button>
          <button className='tbl-btn' onClick={handlePrev} disabled={!canPrev} aria-label='Previous page'>
            <Icon name='chevronLeft' size={14} />
          </button>
          <span className='tbl-page-info'>
            Page {totalPages === 0 ? 0 : page + 1} of {totalPages}
          </span>
          <button className='tbl-btn' onClick={handleNext} disabled={!canNext} aria-label='Next page'>
            <Icon name='chevronRight' size={14} />
          </button>
          <button
            className='tbl-btn'
            onClick={() => handlePageChange(totalPages - 1)}
            disabled={!canNext}
            aria-label='Last page'>
            »
          </button>
          <span className='tbl-range'>
            {from}-{to} of {total}
          </span>
        </div>
        <div className='tbl-page-size'>
          <label>
            Rows:{' '}
            <select value={pageSize} onChange={(e) => handlePageSizeChange(Number(e.target.value))}>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  );
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}
