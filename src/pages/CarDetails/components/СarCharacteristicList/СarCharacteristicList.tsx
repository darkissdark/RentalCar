import type { ReactNode } from "react";
import styles from "./СarCharacteristicList.module.css";

interface ListItem {
  icon: ReactNode;
  text: string;
}

interface ContainerProps {
  title: string;
  items: ListItem[];
  className?: string;
}

export const СarCharacteristicList = ({
  title,
  items,
  className = "",
}: ContainerProps) => {
  return (
    <section className={`${styles.wrapper} ${className}`}>
      <h2 className={styles.title}>{title}</h2>
      <ul className={styles.list}>
        {items.map((item, index) => (
          <li key={index} className={styles.listItem}>
            <svg className={styles.icon} width="16" height="16">
              <use xlinkHref={`/assets/sprite.svg#${item.icon}`}></use>
            </svg>
            <span className={styles.text}>{item.text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default СarCharacteristicList;
