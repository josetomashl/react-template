import { css } from '@/utils';
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router';
import { Icon } from '../Icon';
import { navItems, NavLinkItem } from './links';
import styles from './styles.module.scss';

const SidebarItem = ({ item }: { item: NavLinkItem }) => {
  const { pathname } = useLocation();
  const isActive = pathname === item.path;

  return (
    <div className={css(styles.sidebarItem, isActive ? styles.active : '')}>
      <NavLink to={item.path} className={styles.sidebarLink}>
        <Icon name={item.icon} />
        <span>{item.label}</span>
      </NavLink>
    </div>
  );
};

export const Sidebar = () => {
  const { pathname } = useLocation();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (label: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  return (
    <div className={styles.sidebar}>
      {navItems.map((item, index) => {
        if (item.path) {
          return <SidebarItem key={index} item={item} />;
        } else if (item.children) {
          const hasActiveChild = item.children?.some((child) => pathname === child.path);
          const isOpen = openGroups[item.label] ?? hasActiveChild;

          return (
            <div key={index} className={css(styles.sidebarGroup, isOpen ? styles.open : '')}>
              <div
                className={css(styles.sidebarLink, hasActiveChild ? styles.activeParent : '')}
                onClick={() => toggleGroup(item.label)}>
                <Icon name={item.icon} />
                <span>{item.label}</span>
                <Icon name={isOpen ? 'circleCheck' : 'circleX'} />
              </div>
              {isOpen && (
                <div className={styles.sidebarChildren}>
                  {item.children.map((child, childIndex) => (
                    <SidebarItem key={'child-' + childIndex} item={child} />
                  ))}
                </div>
              )}
            </div>
          );
        }
      })}
    </div>
  );
};
