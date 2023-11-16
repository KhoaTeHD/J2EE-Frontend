import React from "react";
import Image from "next/image";
import styles from '@/styles/Edit_Password.module.css'
import OptionProfile from "./components/OptionEditProfile";

const Edit_Password = () => {

    return (
        <div className={styles.password}>
            <style jsx global>{`
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }                
            `}</style>

            <OptionProfile />

            <div className={styles.right}>
                <p className={styles.right_heading}>Đổi mật khẩu</p>
                <div className={styles.right_content}>
                    <div className={styles.right_block}>
                        <label htmlFor="old_pass" >Mật khẩu hiện tại</label>
                        <input type="text" name="" id="old_pass" />
                        <label htmlFor="new_pass">Mật khẩu mới</label>
                        <input type="text" name="" id="new_pass" />
                        <label htmlFor="new_pass_again">Xác nhận mật khẩu</label>
                        <input type="text" name="" id="new_pass_again" />
                        <button className={styles.right_save_btn}>Lưu thay đổi</button>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default Edit_Password;