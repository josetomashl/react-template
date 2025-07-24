import { useRef, useState } from 'react';
import { Icon, IconNames } from '../Icon';
import styles from './styles.module.scss';

export interface AccordionItemType {
  icon?: IconNames;
  title: string;
  content: string;
}

type Props = {
  items: AccordionItemType[];
};
export function Accordion(props: Props) {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? undefined : index);
  };

  return (
    <ul className={styles.accordion}>
      {props.items.map((item, index) => (
        <AccordionItem
          key={index}
          index={index}
          icon={item.icon}
          title={item.title}
          content={item.content}
          active={activeIndex}
          handleToggle={handleToggle}
        />
      ))}
    </ul>
  );
}

function AccordionItem(
  props: AccordionItemType & {
    index: number;
    active?: number;
    handleToggle: (index: number) => void;
  }
) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <li className={styles.accordionItem}>
      <h3
        onClick={() => props.handleToggle(props.index)}
        className={props.active === props.index ? styles.active : undefined}>
        <span>
          {props.icon && <Icon color='white' name={props.icon} size={20} />}
          {props.title}
        </span>
        <Icon color='white' name={props.active === props.index ? 'chevronUp' : 'chevronDown'} size={20} />
      </h3>
      <div
        ref={ref}
        className={styles.accordionContent}
        style={props.active === props.index ? { height: ref.current?.scrollHeight } : { height: 0 }}>
        <p>{props.content}</p>
      </div>
    </li>
  );
}
