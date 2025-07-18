import { css } from '@/utils';
import { type PropsWithChildren, type ReactNode, useState } from 'react';
import { Icon, type IconNames } from '../Icon';
import styles from './styles.module.scss';

type Props = {
  tabs: Array<{
    label: string;
    icon?: IconNames;
    iconColor?: string;
  }>;
  defaultActive?: number;
  onChange?: (index: number) => void;
  vertical?: boolean;
  children?: ReactNode[];
};
export function Tabs({ tabs, defaultActive = 0, onChange, vertical = false, children }: Props) {
  const [activeIndex, setActiveIndex] = useState(defaultActive);

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
    if (onChange) {
      onChange(index);
    }
  };

  return (
    <div className={css(styles['tabs-container'], vertical ? styles['vertical'] : '')}>
      <div className={css(styles['tabs-header'], vertical ? styles['vertical'] : '')}>
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={css(styles['tab-item'], index === activeIndex ? styles['active'] : '')}
            onClick={() => handleTabClick(index)}>
            {tab.icon && <Icon name={tab.icon} size={24} color={tab.iconColor || '#333'} />}
            {tab.label}
          </div>
        ))}
      </div>
      <>{children?.length && children[activeIndex]}</>
    </div>
  );
}

export function Tab(props: PropsWithChildren) {
  return <div className={styles['tabs-content']}>{props.children}</div>;
}
