import React from "react";
import styles from "./SummaryCard.module.css"; // Import as object

interface SummaryCardProps {
  title: string;
  amount: string;
  subtitle?: string;
  color?: string;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  amount,
  subtitle,
  color = "#007AFF",
}) => {
  return (
    <div className={styles.card}>
      <p className={styles.title}>{title}</p>
      <p className={styles.amount} style={{ color }}>
        {amount}
      </p>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
};