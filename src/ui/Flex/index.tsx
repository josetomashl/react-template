import { classes } from '@/utils';
import type { CSSProperties, PropsWithChildren } from 'react';
import styles from './index.module.scss';

interface Props {
  flexDirection?: CSSProperties['flexDirection'];
  flexWrap?: CSSProperties['flexWrap'];
  justifyContent?: CSSProperties['justifyContent'];
  alignItems?: CSSProperties['alignItems'];
  alignContent?: CSSProperties['alignContent'];

  gap?: CSSProperties['gap'];

  flex?: CSSProperties['flex'];
  inline?: boolean;
  flexGrow?: CSSProperties['flexGrow'];
  flexShrink?: CSSProperties['flexShrink'];
  flexBasis?: CSSProperties['flexBasis'];

  width?: CSSProperties['width'];
  minWidth?: CSSProperties['minWidth'];
  maxWidth?: CSSProperties['maxWidth'];

  height?: CSSProperties['height'];
  minHeight?: CSSProperties['minHeight'];
  maxHeight?: CSSProperties['maxHeight'];

  overflow?: CSSProperties['overflow'];
  overflowX?: CSSProperties['overflowX'];
  overflowY?: CSSProperties['overflowY'];

  style?: CSSProperties;
  className?: string;
}

export const Flex = ({
  children,
  flexDirection = 'row',
  flexWrap = 'nowrap',
  justifyContent = 'flex-start',
  alignItems = 'stretch',
  alignContent,
  gap = 0,
  flex,
  inline,
  flexGrow,
  flexShrink,
  flexBasis,
  width,
  minWidth,
  maxWidth,
  height,
  minHeight,
  maxHeight,
  overflow,
  overflowX,
  overflowY,
  style,
  className
}: PropsWithChildren<Props>) => {
  return (
    <div
      className={classes(
        inline ? styles.inlineFlex : styles.flex,
        styles[`direction-${flexDirection}`],
        styles[`wrap-${flexWrap}`],
        styles[`justify-${justifyContent}`],
        styles[`align-${alignItems}`],
        styles[`align-content-${alignContent}`],
        styles[`overflow-${overflow}`],
        styles[`overflow-x-${overflowX}`],
        styles[`overflow-y-${overflowY}`],
        className
      )}
      style={{
        gap,
        flex,
        flexGrow,
        flexShrink,
        flexBasis,
        width,
        minWidth,
        maxWidth,
        height,
        minHeight,
        maxHeight,
        ...style
      }}>
      {children}
    </div>
  );
};
