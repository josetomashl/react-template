import { ICONS } from '@/plugins/data/icons';

export type IconNames = keyof typeof ICONS;
type Props = {
  name: IconNames;
  size?: number;
  color?: string;
  fill?: string | 'none';
};

export function Icon({ name, size = 24, color = '#272727', fill = 'none' }: Props) {
  if (!name || !ICONS[name]) {
    console.warn(`Icon "${name}" not found.`);
    return null;
  }

  const path = ICONS[name];

  return (
    <svg
      viewBox='0 0 24 24'
      fill={fill}
      width={size}
      height={size}
      stroke={color}
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      role='img'>
      <path d={path} />
    </svg>
  );
}
