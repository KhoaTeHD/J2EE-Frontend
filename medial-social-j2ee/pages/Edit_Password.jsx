import React from "react";
import styles from '@/styles/Edit_Password.module.css'
import OptionProfile from "./components/OptionEditProfile";
import { useState, useEffect } from 'react';
import axios from 'axios';
import authHeader from "./api/auth-header";
import authService from './api/auth-service';
import Image from "next/image";

const Edit_Password = () => {

    var user = authService.getCurrentUser();

    const [oldPass, setOldPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [enterNewPass, setEnterNewPass] = useState("");
    const [visible1, setVisible1] = useState(true);
    const [visible2, setVisible2] = useState(true);
    const [visible3, setVisible3] = useState(true);
    const [error1, setError1] = useState("");
    const [error2, setError2] = useState("");
    const [error3, setError3] = useState("");

    const onChangeOldPass = (e) => {
        const oldPass = e.target.value;
        setOldPass(oldPass);
    };

    const onChangeNewPass = (e) => {
        const newPass = e.target.value;
        setNewPass(newPass);
    };

    const onChangeEnterNewPass = (e) => {
        const enterNewPass = e.target.value;
        setEnterNewPass(enterNewPass);
    };

    const handleSaveChange = () => {
        let valid = 1;

        setError1("");
        setError2("");
        setError3("");

        if (oldPass.trim() === '') {
            setError1("Trường này không được để trống!");
            valid = 0;
        }

        if (newPass.trim() === '') {
            setError2("Trường này không được để trống!");
            valid = 0;
        } else if (newPass.trim().length < 6 || newPass.trim().length > 20) {
            setError2("Mật khẩu mới phải từ 6 - 20 kí tự!");
            valid = 0;
        } else { };

        if (enterNewPass.trim() === '') {
            setError3("Trường này không được để trống!");
            valid = 0;
        } else if (enterNewPass.trim() !== newPass.trim()) {
            setError3("Mật khẩu nhập lại không trùng khớp!");
            valid = 0;
        }

        if (valid === 1) {
            console.log("change");
            class updatePasswordRequest {
                constructor(old_password, new_password) {
                    this.old_password = old_password;
                    this.new_password = new_password
                }
            }

            const updatePassword = new updatePasswordRequest(oldPass.trim(), newPass.trim());

            axios.post("http://localhost:8080/api/userProfile/updatePassword/" + user.id, updatePassword, { headers: authHeader() })
                .then(response => {
                    const respString = JSON.stringify(response.data);
                    //Xử lý phản hồi từ API nếu cần
                    if (respString === "101") {
                        setError1("Mật khẩu cũ chưa chính xác!");
                    } else if (respString === "102") {
                        setError2("Mật khẩu mới trùng với mật khẩu cũ!");
                    } else if (respString === "103") {
                        alert("Cập nhật mật khẩu thành công!");
                        setOldPass("");
                        setNewPass("");
                        setEnterNewPass("");
                    } else { };


                })
                .catch(error => {
                    // Xử lý lỗi nếu có
                    alert('Lỗi khi cập nhật' + error);
                });
        }

    }

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
                        <div className={styles.input_block}>
                            <input id="old_pass"
                                onChange={onChangeOldPass}
                                value={oldPass}
                                type={visible1 ? "password" : "text"}
                            />
                            <div className={styles.eyes} onClick={() => setVisible1(!visible1)}>
                                {visible1 ? <Image className={styles.card_img} src="/icons/icons8-hide-48.png" alt="" width="20" height="20" />
                                    : <Image className={styles.card_img} src="/icons/icons8-show-48.png" alt="" width="20" height="20" />}
                            </div>
                        </div>
                        <p className={styles.error}>{error1}</p>

                        <label htmlFor="new_pass">Mật khẩu mới</label>
                        <div className={styles.input_block}>
                            <input id="new_pass"
                                onChange={onChangeNewPass}
                                value={newPass}
                                type={visible2 ? "password" : "text"}
                            />
                            <div className={styles.eyes} onClick={() => setVisible2(!visible2)}>
                                {visible2 ? <Image className={styles.card_img} src="/icons/icons8-hide-48.png" alt="" width="20" height="20" />
                                    : <Image className={styles.card_img} src="/icons/icons8-show-48.png" alt="" width="20" height="20" />}
                            </div>
                        </div>
                        <p className={styles.error}>{error2}</p>
                        <label htmlFor="new_pass_again">Xác nhận mật khẩu</label>
                        <div className={styles.input_block}>
                            <input id="new_pass_again"
                                onChange={onChangeEnterNewPass}
                                value={enterNewPass}
                                type={visible3 ? "password" : "text"}
                            />
                            <div className={styles.eyes} onClick={() => setVisible3(!visible3)}>
                                {visible3 ? <Image className={styles.card_img} src="/icons/icons8-hide-48.png" alt="" width="20" height="20" />
                                    : <Image className={styles.card_img} src="/icons/icons8-show-48.png" alt="" width="20" height="20" />}
                            </div>
                        </div>
                        <p className={styles.error}>{error3}</p>
                        <button className={styles.right_save_btn} onClick={handleSaveChange}>Lưu thay đổi</button>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default Edit_Password;