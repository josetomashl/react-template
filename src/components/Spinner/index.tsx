import { css } from '@/utils';
import styles from './styles.module.scss';

type Props = {
  size?: number | string;
  color?: string;
  className?: string;
};

export function Spinner({ size = 32, className = '' }: Props) {
  return (
    <svg width={size} height={size} viewBox='0 0 50 50' className={css(styles.container, className)}>
      <circle
        cx='25'
        cy='25'
        r='20'
        fill='none'
        strokeWidth='5'
        strokeDasharray='90,150'
        strokeLinecap='round'
        transform='rotate(-90 25 25)'>
        <animateTransform
          attributeName='transform'
          type='rotate'
          from='0 25 25'
          to='360 25 25'
          dur='1s'
          repeatCount='indefinite'
        />
      </circle>
    </svg>
  );
}
