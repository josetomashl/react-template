import type { CSSProperties, PropsWithChildren } from 'react';

interface Props {
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  justifyContent?: 'space-between' | 'space-around' | 'space-evenly' | 'flex-start' | 'center' | 'flex-end';
  alignItems?: 'stretch' | 'flex-start' | 'center' | 'flex-end' | 'baseline';
  gap?: number;
  style?: CSSProperties;
  className?: string;
}
export const Flex = ({
  children,
  flexDirection = 'row',
  flexWrap = 'nowrap',
  justifyContent = 'flex-start',
  alignItems = 'flex-start',
  gap = 0,
  style,
  className
}: PropsWithChildren<Props>) => {
  return (
    <div
      style={{ display: 'flex', justifyContent, alignItems, flexDirection, gap, flexWrap, ...style }}
      className={className}>
      {children}
    </div>
  );
};
