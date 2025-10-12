import { Icon } from '@/components/Icon';
import { toDate, toDateTime, toPrice, toTime } from '@/plugins/transformers';
import styles from './styles.module.scss';

type HeaderFormat = 'date' | 'time' | 'datetime' | 'price' | undefined;

type Header = { key: string; label: string | null; format: HeaderFormat };
type Item = Record<string, string | number | boolean | null | undefined>;

type Props = {
  headers: Header[];
  items: Item[];
};

const formatValue = (value: string | number, format: HeaderFormat): string | null => {
  switch (format) {
    case 'price':
      return toPrice(value);
    case 'date':
      return typeof value === 'string' ? toDate(value) : String(value);
    case 'time':
      return typeof value === 'string' ? toTime(value) : String(value);
    case 'datetime':
      return typeof value === 'string' ? toDateTime(value) : String(value);
    default:
      return String(value);
  }
};

export function Table({ headers, items }: Props) {
  if (!headers.length) return null;

  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            {headers.map(({ key, label }) => (
              <th key={key}>{label ?? ''}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map(({ key, format }, colIndex) => {
                const value = row[key];

                if (typeof value === 'boolean') {
                  return (
                    <td key={colIndex}>
                      <Icon name={value ? 'circleCheck' : 'circleX'} size={16} color={value ? 'green' : 'red'} />
                    </td>
                  );
                }

                if (typeof value === 'string' || typeof value === 'number') {
                  return (
                    <td key={colIndex}>
                      <span>{formatValue(value, format) ?? '-'}</span>
                    </td>
                  );
                }

                return <td key={colIndex}>-</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
