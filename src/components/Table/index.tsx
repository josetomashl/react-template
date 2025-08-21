import { useAppSelector } from '@/store';
import { Icon } from '../Icon';
import { Spinner } from '../Spinner';
import styles from './styles.module.scss';

type HeaderItem = { key: string; label: string };

type Props = {
  headers: HeaderItem[];
  module: 'users' | 'posts';
  onPageChange: (page: number) => Promise<void> | void;
  onPageSizeChange: (pageSize: number) => Promise<void> | void;
};

export function Table(props: Props) {
  const module = useAppSelector((state) => state[props.module]);
  const { page, pageSize, total } = module.pagination;

  const totalPages = Math.ceil(total / pageSize);
  const canPrev = page > 0;
  const canNext = page < totalPages - 1;

  const handlePageChange = (p: number) => {
    props.onPageChange(p);
  };
  const handlePageSizeChange = (p: number) => {
    props.onPageSizeChange(p);
  };

  const handlePrev = () => handlePageChange(Math.max(page - 1, 0));
  const handleNext = () => handlePageChange(Math.min(page + 1, totalPages - 1));

  if (module.loading) {
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
          {module.list.map((row, rowIndex) => (
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
        <span>{total} entries</span>
        <div>
          <button onClick={() => handlePageChange(0)} disabled={!canPrev} aria-label='First page'>
            «
          </button>
          <button onClick={handlePrev} disabled={!canPrev} aria-label='Previous page'>
            <Icon name='chevronLeft' size={14} />
          </button>
          <span className='tbl-page-info'>
            Page {totalPages === 0 ? 0 : page + 1} of {totalPages}
          </span>
          <button onClick={handleNext} disabled={!canNext} aria-label='Next page'>
            <Icon name='chevronRight' size={14} />
          </button>
          <button onClick={() => handlePageChange(totalPages - 1)} disabled={!canNext} aria-label='Last page'>
            »
          </button>
        </div>
        <div>
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
