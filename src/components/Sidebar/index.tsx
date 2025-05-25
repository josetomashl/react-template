import { Icon } from '@/components/Icon';
import { css } from '@/utils';
import { useState } from 'react';
import { NavLink } from 'react-router';
import { navItems, type NavLinkItem } from './links';
import styles from './styles.module.scss';

const SidebarItem = ({ item }: { item: NavLinkItem }) => {
  return (
    <NavLink to={item.path} className={({ isActive }) => css(isActive ? styles.active : '', styles.sidebarLink)}>
      <Icon name={item.icon} />
      <span>{item.label}</span>
    </NavLink>
  );
};

export const Sidebar = () => {
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
        } else if (item.children?.length) {
          const isOpen = openGroups[item.label];

          return (
            <div key={index}>
              <div className={styles.sidebarGroupHead} onClick={() => toggleGroup(item.label)}>
                <div className={styles.sidebarLink}>
                  <Icon name={item.icon} />
                  <span>{item.label}</span>
                </div>
                <Icon name={isOpen ? 'chevronUp' : 'chevronDown'} size={18} />
              </div>
              <div className={css(styles.sidebarChildren, isOpen ? styles.open : '')}>
                {item.children.map((child, childIndex) => (
                  <SidebarItem key={'child-' + childIndex} item={child} />
                ))}
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};
