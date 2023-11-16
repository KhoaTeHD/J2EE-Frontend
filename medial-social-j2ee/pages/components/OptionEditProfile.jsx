import React from "react";
import Link from "next/link";
import styles from '@/styles/Edit_Profile_Left.module.css'

const OptionProfile = () => {
    return (
        <div className={styles.left}>
            <p className={styles.left_heading}>Cài đặt</p>
            <Link className={styles.left_edit_prof_btn} href={"/Edit_Profile"}>Sửa trang cá nhân</Link>
            <Link className={styles.left_change_pass_btn} href={"/Edit_Password"}>Đổi mật khẩu</Link>
            <Link className={styles.left_return_btn} href={"/Profile"}>Trở về</Link>
        </div>
    )
}

export default OptionProfile;