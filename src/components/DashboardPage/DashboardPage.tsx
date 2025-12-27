import React, { useMemo, useState } from "react";

import styles from "./DashboardPage.module.css"; // We'll create this
import { SummaryCard } from "../SummaryCard/SummaryCard";
import { ImageUpload } from "../ImageUpload/ImageUpload";
import { Receipt, ReceiptList } from "../ReceiptList/ReceiptList";
import axios from "axios";

const CATEGORY_MAP: Record<string, string> = {
  "購物": "Groceries (雜貨/超市購物)",
  "交通": "Transportation (交通)",
  "其他": "Utilities (公用事業)",    
  "娛樂": "Entertainment (娛樂)",
  "食飯": "Food & Drinks (食物與飲料)",
};

const CATEGORY_CONFIG = [
  { key: "Groceries (雜貨/超市購物)", color: "#4CAF50" },
  { key: "Transportation (交通)", color: "#2196F3" },
  { key: "Utilities (公用事業)", color: "#FF9800" },
  { key: "Entertainment (娛樂)", color: "#9C27B0" },
  { key: "Food & Drinks (食物與飲料)", color: "#F44336" },
];

export const DashboardPage: React.FC = () => {
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [receipts, setReceipts] = useState<Receipt[]>([]);

  const categoryTotals = useMemo(() => {
    const totals: Record<string, number> = {
      "Groceries (雜貨/超市購物)": 0,
      "Transportation (交通)": 0,
      "Utilities (公用事業)": 0,
      "Entertainment (娛樂)": 0,
      "Food & Drinks (食物與飲料)": 0,
    };

    receipts.forEach((receipt) => {
      const amount = parseFloat(receipt.amount.replace('$', ''));
      if (!isNaN(amount) && totals.hasOwnProperty(receipt.type)) {
        totals[receipt.type] += amount;
      }
    });

    return totals;
  }, [receipts]);

  const handleReceiptUpload = async (file: File) => {
    setProcessing(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('image', file);
    formData.append('ocr_engine', 'easyocr'); // or 'paddle'

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/ai_model/GetOcrResultCategorizer', 
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const data = response.data;
      if (!data.TotalAmount || !data.predictions) {
        throw new Error('Invalid response from server');
      }

      const firstModel = Object.keys(data.predictions)[1];
      let predictedShort = data.predictions[firstModel]; // e.g., "食飯" or "購物"
      let predictedCategory = CATEGORY_MAP[predictedShort];

      const amountNum = parseFloat(data.TotalAmount);
      const formattedAmount = isNaN(amountNum) ? "$0.00" : `$${amountNum.toFixed(2)}`;

      if (!predictedCategory) {
        console.warn(`Unknown category predicted: ${predictedShort}. Using fallback.`);
        predictedCategory = "Food & Drinks (食物與飲料)"; 
      }

      const newReceipt: Receipt = {
        id: Date.now().toString(), 
        type: predictedCategory,
        amount: `$${parseFloat(data.TotalAmount).toFixed(2)}`,
        date: new Date()
      };

      setResult(data);
      setReceipts((prev) => [newReceipt, ...prev]);

      alert(`Receipt added!\nCategory: ${predictedCategory}\nAmount: ${newReceipt.amount}`);
      // alert(
      //   `Success!\n\n` +
      //   `Total Amount: $${data.TotalAmount}\n` +
      //   `Predicted Categories:\n` +
      //   Object.entries(data.predictions)
      //     .map(([model, category]) => `• ${model}: ${category}`)
      //     .join('\n')
      // );

    } catch (error: any) {
      console.error('OCR API error:', error);
      const msg = error.response?.data?.error || 'Failed to process receipt';
      alert(`Error: ${msg}`);
    } finally {
      setProcessing(false);
    }
  };

  const handleDelete = (id: string) => {
    setReceipts((prev) => prev.filter((r) => r.id !== id));
  };


  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Monthly Expense Summary</h1>
      
      <div className={styles.cardsGrid}>
        {CATEGORY_CONFIG.map(({ key, color }) => (
          <SummaryCard
            key={key}
            title={key}
            amount={`$${categoryTotals[key].toFixed(2)}`}
            subtitle="12/2025"
            color={color}
          />
        ))}
      </div>

      <ReceiptList receipts={receipts} onDelete={handleDelete}/>


      {processing && <p>Processing receipt with AI... Please wait.</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className={styles.uploadSection}>
        <h2 className={styles.uploadTitle}>Upload Receipt</h2>
        <p className={styles.uploadHint}>
          Click below to upload a photo of your receipt for automatic tracking
        </p>
        <ImageUpload
          buttonText="Upload Receipt Image"
          maxSizeMB={10}
          onUploadSuccess={(file) => {
            handleReceiptUpload(file);
            alert("Receipt uploaded successfully!");
          }}
          
        />
      </div>
    </div>
  );
};