import React from 'react';
import styles from '@/styles/ConfirmationDialog.module.css'; 

const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
    return (
        <div className={styles.overlay}>
            <div className={styles.options_container}>
                <span className={styles.delete_option} onClick={onConfirm} >Xác nhận</span>
                <span className={styles.cancel_option} onClick={onCancel} >Hoàn tác</span>
            </div>
        </div>
    );
};

export default ConfirmationDialog;