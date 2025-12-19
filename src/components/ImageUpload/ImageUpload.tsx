import React, { useState, useRef } from "react";
import styles from "./ImageUpload.module.css"; // Keep this name or rename file accordingly

interface ImageUploadProps {
  onUploadSuccess?: (url: string) => void;
  maxSizeMB?: number;
  buttonText?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onUploadSuccess,
  maxSizeMB = 5,
  buttonText = "Upload Image",
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate image type
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    // Validate size
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File must be smaller than ${maxSizeMB}MB.`);
      return;
    }

    setError(null);

    // Generate preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Start upload
    uploadImage(file);
  };

  const uploadImage = async (file: File) => {
    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("image", file);

    try {
      // Uncomment and update when you have a real backend
      /*
      const response = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      const uploadedUrl = data.url; // Adjust based on your API response

      onUploadSuccess?.(uploadedUrl);
      */

      // For now: simulate success after 1 second (remove later)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Image ready for upload:", file.name);
      onUploadSuccess?.("https://example.com/uploaded-image.jpg"); // Mock URL
    } catch (err) {
      setError("Upload failed. Please try again.");
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={styles.uploadButtonContainer}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      <button
        className={styles.uploadBtn}
        onClick={handleClick}
        disabled={isUploading}
      >
        {isUploading ? "Uploading..." : buttonText}
      </button>

      {error && <p className={styles.errorText}>{error}</p>}

      {imagePreview && (
        <div className={styles.previewContainer}>
          <p className={styles.previewLabel}>Preview:</p>
          <img
            src={imagePreview}
            alt="Selected preview"
            className={styles.previewImg}
          />
        </div>
      )}
    </div>
  );
};