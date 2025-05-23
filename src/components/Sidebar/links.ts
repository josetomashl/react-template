import type { IconNames } from '@/components/Icon';
import type { To } from 'react-router';

type BaseNavItem = {
  label: string;
  icon: IconNames;
};
export type NavLinkItem = BaseNavItem & {
  path: To;
  children?: never; // no puede tener children si tiene path
};
export type NavGroupItem = BaseNavItem & {
  path?: never; // no puede tener path si tiene children
  children: NavLinkItem[]; // children no pueden tener children
};
type NavItem = NavLinkItem | NavGroupItem;

export const navItems: NavItem[] = [
  {
    label: 'Home',
    path: '/',
    icon: 'circleExclamation'
  },
  {
    label: 'Legal',
    icon: 'circleCheck',
    children: [
      {
        label: 'Page legal 1',
        path: '/legal/page-1',
        icon: 'circleX'
      },
      {
        label: 'Page legal 2',
        path: '/legal/page-2',
        icon: 'circleInfo'
      }
    ]
  },
  {
    label: 'Page 1',
    path: '/page-1',
    icon: 'circleX'
  },
  {
    label: 'Page 2',
    path: '/page-2',
    icon: 'circleX'
  }
];
