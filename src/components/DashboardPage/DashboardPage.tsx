import React from "react";

import styles from "./DashboardPage.module.css"; // We'll create this
import { SummaryCard } from "../SummaryCard/SummaryCard";
import { ImageUpload } from "../ImageUpload/ImageUpload";
import { ReceiptList } from "../ReceiptList/ReceiptList";

export const DashboardPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Monthly Expense Summary</h1>

      {/* 5 Summary Cards in a grid */}
      <div className={styles.cardsGrid}>
        <SummaryCard
          title="Groceries (雜貨/超市購物)"
          amount="$320"
          subtitle="This month"
          color="#4CAF50"
        />
        <SummaryCard
          title="Transportation (交通)"
          amount="$150"
          subtitle="This month"
          color="#2196F3"
        />
        <SummaryCard
          title="Utilities (公用事業)"
          amount="$120"
          subtitle="This month"
          color="#FF9800"
        />
        <SummaryCard
          title="Entertainment (娛樂)"
          amount="$80"
          subtitle="This month"
          color="#9C27B0"
        />
        <SummaryCard
          title="Food & Drinks (食物與飲料)"
          amount="$450"
          subtitle="This month"
          color="#F44336"
        />
      </div>

      <ReceiptList/>

      {/* Image Upload Section */}
      <div className={styles.uploadSection}>
        <h2 className={styles.uploadTitle}>Upload Receipt</h2>
        <p className={styles.uploadHint}>
          Click below to upload a photo of your receipt for automatic tracking
        </p>
        <ImageUpload
          buttonText="Upload Receipt Image"
          maxSizeMB={10}
          onUploadSuccess={(url) => {
            console.log("Receipt uploaded:", url);
            alert("Receipt uploaded successfully!");
          }}
        />
      </div>
    </div>
  );
};