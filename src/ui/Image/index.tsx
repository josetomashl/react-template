import { classes } from '@/utils';
import type { CSSProperties } from 'react';
import styles from './index.module.scss';

interface Props {
  alt: string;
  objectFit?: CSSProperties['objectFit'];
  objectPosition?: CSSProperties['objectPosition'];
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  borderRadius?: CSSProperties['borderRadius'];
  lazy?: boolean;

  className?: string;
  style?: CSSProperties;
}

export const Image = ({
  alt,
  objectFit = 'cover',
  objectPosition = 'center',
  width,
  height,
  borderRadius,
  lazy,
  className,
  style
}: Props) => {
  return (
    <img
      alt={alt}
      loading={lazy ? 'lazy' : undefined}
      draggable={false}
      className={classes(styles.image, styles[`fit-${objectFit}`], className)}
      style={{
        width,
        height,
        borderRadius,
        objectPosition,
        ...style
      }}
    />
  );
};
