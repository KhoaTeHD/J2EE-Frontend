import React from 'react';
import styles from '@/styles/SavePostSuccessPopup.module.css';
import Link from 'next/link';

const SavePostSuccessPopup = ({ message, onClose }) => {
  return (
    <div className={styles.popup}>
      <div className={styles.popup_content}>
        <p>{message}</p>
        <Link href={"/Homepage"}>
          <button onClick={onClose}>Đóng</button>
        </Link>
      </div>
    </div>
  );
};

export default SavePostSuccessPopup;