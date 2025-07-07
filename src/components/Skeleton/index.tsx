import styles from './styles.module.scss';

interface Props {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
}

export function Skeleton({ width = '100%', height = '1em', borderRadius = 6 }: Props) {
  return (
    <span
      className={styles.skeleton}
      style={{
        width,
        height,
        borderRadius,
      }}
    />
  );
}
