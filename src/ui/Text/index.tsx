import { classes } from '@/utils';
import type { CSSProperties, ElementType, PropsWithChildren } from 'react';
import styles from './index.module.scss';

interface Props {
  as?: ElementType;

  size?: CSSProperties['fontSize'];
  weight?: CSSProperties['fontWeight'];
  lineHeight?: CSSProperties['lineHeight'];
  color?: CSSProperties['color'];

  align?: CSSProperties['textAlign'];
  transform?: CSSProperties['textTransform'];

  italic?: boolean;
  underline?: boolean;
  strike?: boolean;

  wrap?: 'wrap' | 'nowrap' | 'balance';
  truncate?: boolean;
  noSelect?: boolean;

  style?: CSSProperties;
  className?: string;
}

export const Text = ({
  children,
  as: Component = 'p',
  size,
  weight,
  lineHeight,
  color = '#0a0a0a',
  align = 'left',
  transform = 'none',
  wrap = 'wrap',
  italic,
  underline,
  strike,
  truncate,
  noSelect,
  style,
  className
}: PropsWithChildren<Props>) => {
  return (
    <Component
      className={classes(
        styles.text,
        styles[`align-${align}`],
        styles[`transform-${transform}`],
        styles[`wrap-${wrap}`],
        italic && styles.italic,
        underline && styles.underline,
        strike && styles.strike,
        truncate && styles.truncate,
        noSelect && styles.noSelect,
        className
      )}
      style={{
        fontSize: size,
        fontWeight: weight,
        lineHeight,
        color,
        ...style
      }}>
      {children}
    </Component>
  );
};
