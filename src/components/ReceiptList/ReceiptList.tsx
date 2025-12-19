import React from "react";
import styles from "./ReceiptList.module.css";

// Define receipt type
interface Receipt {
  id: string;
  type: string;          // e.g., "Groceries", "Food & Drinks"
  amount: string;        // e.g., "$45.80"
  date: Date;            // Upload or transaction date
}

interface ReceiptListProps {
  receipts?: Receipt[];
  onDelete?: (id: string) => void; // Callback when delete is clicked
}

export const ReceiptList: React.FC<ReceiptListProps> = ({
  receipts = [
    // Sample data — remove when using real state
    {
      id: "1",
      type: "Food & Drinks (食物與飲料)",
      amount: "$45.80",
      date: new Date("2025-12-15"),
    },
    {
      id: "2",
      type: "Groceries (雜貨/超市購物)",
      amount: "$120.50",
      date: new Date("2025-12-12"),
    },
    {
      id: "3",
      type: "Transportation (交通)",
      amount: "$28.00",
      date: new Date("2025-12-10"),
    },
  ],
  onDelete = (id) => {
    console.log("Delete receipt:", id);
    alert(`Deleted receipt ${id}`);
  },
}) => {
  if (receipts.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No receipts recorded yet.</p>
        <p>Upload a receipt to get started!</p>
      </div>
    );
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className={styles.listContainer}>
      <h2 className={styles.listTitle}>Recent Receipts</h2>

      <div className={styles.table}>
        {/* Header */}
        <div className={styles.tableRow + " " + styles.header}>
          <div className={styles.colType}>Type</div>
          <div className={styles.colAmount}>Amount</div>
          <div className={styles.colDate}>Date</div>
          <div className={styles.colAction}>Action</div>
        </div>

        {/* Rows */}
        {receipts.map((receipt) => (
          <div key={receipt.id} className={styles.tableRow}>
            <div className={styles.colType}>{receipt.type}</div>
            <div className={styles.colAmount}>{receipt.amount}</div>
            <div className={styles.colDate}>{formatDate(receipt.date)}</div>
            <div className={styles.colAction}>
              <button
                className={styles.deleteBtn}
                onClick={() => onDelete(receipt.id)}
                aria-label="Delete receipt"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 6h18" />
                  <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  <path d="M5 6l1 14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-14" />
                  <path d="M10 11v6" />
                  <path d="M14 11v6" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};