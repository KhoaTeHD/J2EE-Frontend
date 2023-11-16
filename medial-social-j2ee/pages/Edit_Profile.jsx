import React from "react";
import Image from "next/image";
import styles from '@/styles/Edit_Profile.module.css'
import OptionProfile from "./components/OptionEditProfile";

const Edit_Profile = () => {

    return (
        <div className={styles.profile}>
            <style jsx global>{`
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }                
            `}</style>
            <OptionProfile />

            <div className={styles.right}>
                <p className={styles.right_heading}>Sửa trang cá nhân</p>
                <div className={styles.right_prof}>
                    <div className={styles.right_prof_content}>
                        <div className={styles.right_prof_row_first}>
                            <label className={styles.right_prof_row_avatar} htmlFor="right_prof_row_avatar_src">
                                <Image src="/images/avatar.png" width="120" height="120"></Image>
                            </label>
                            <input className={styles.right_prof_row_avatar_src} type="file" name="" id="right_prof_row_avatar_src" />
                        </div>
                        <div className={styles.right_prof_row}>
                            <label htmlFor="name" className={styles.right_prof_row_label}>Tên</label>
                            <input type="text" id="name" className={styles.right_prof_row_input} />
                        </div>
                        <div className={styles.right_prof_row}>
                            <label htmlFor="birthday" className={styles.right_prof_row_label}>Ngày sinh</label>
                            <input type="date" id="birthday" className={styles.right_prof_row_input} />
                        </div>
                        <div className={styles.right_prof_row}>
                            <label htmlFor="biography" className={styles.right_prof_row_label}>Tiểu sử</label>
                            <textarea name="" id="biography" cols="53" rows="10" className={styles.right_prof_row_inpu}></textarea>
                        </div>
                        <div className={styles.right_prof_row}>
                            <label className={styles.right_prof_row_label} htmlFor="gender">Giới tính</label>
                            <div id="gender" className={styles.gender}>
                                Nam <input className={styles.gender_male} type="radio" name="gender" id="" value="Nam" checked />
                                Nữ <input className={styles.female} type="radio" name="gender" id="" value="Nữ" />
                            </div>
                        </div>
                        <div className={styles.right_prof_row}>
                            <label htmlFor="phone" className={styles.right_prof_row_label}>Số điện thoại</label>
                            <input type="text" id="phone" className={styles.right_prof_row_input} />
                        </div>
                        <button className={styles.right_prof_save}>
                            Lưu thay đổi
                        </button>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default Edit_Profile;