import React from "react";
import styles from '@/styles/Edit_Profile.module.css'
import OptionProfile from "./components/OptionEditProfile";
import authHeader from "./api/auth-header";
import authService from './api/auth-service';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Edit_Profile = () => {

    const notify = (message) => toast.success(message);

    var user = authService.getCurrentUser();

    const [data, setData] = useState([]);

    const [profileName, setProfileName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [biography, setBiography] = useState("");
    const [gender, setGender] = useState(1);
    const [avatar, setAvatar] = useState("");
    const [changeAvatar, setChangeAvatar] = useState(0);
    const [errorAvatar, setErrorAvatar] = useState("");
    const [errorProfileName, setErrorProfileName] = useState("");
    const [errorBirthday, setErrorBirthday] = useState("");
    const [errorBiography, setErrorBiography] = useState("");
    const [errorGender, setErrorGender] = useState("");
    const [count_bio, setCountBio] = useState(0);
    const [selectedFile, setSelectedFile] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("http://localhost:8080/api/userProfile/id/" + user.id, { headers: authHeader() })
            setData(response.data);
            setProfileName(response.data.profileName);
            setBirthday(response.data.birthday);
            setBiography(response.data.biography);
            setGender(response.data.gender);
            if (response.data.avatar == null) {
                setAvatar('/images/avatar.png');
            } else {
                setAvatar(response.data.avatar);
            }
            setCountBio(response.data.biography == null ? 0 : response.data.biography.length);
        };
        fetchData();
    }, []);

    const onChangeProfileName = (e) => {
        const profileName = e.target.value;
        setProfileName(profileName);
    };

    const onChangeBirthday = (e) => {
        const birthday = e.target.value;
        setBirthday(birthday);
    };

    const onChangeBiography = (e) => {
        const bio = e.target.value;
        if (bio.length <= 150) {
            setBiography(bio);
            setCountBio(bio.length);
        } else {
            setBiography(bio.slice(0, 150));
            setCountBio(150);
        }

    };

    const onChangeGender = (e) => {
        const selectedGender = e.target.value;
        setGender(selectedGender === "Nam" ? 1 : 0);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setAvatar(imageUrl);
            setSelectedFile(file);
            setChangeAvatar(1);
        }
    };

    const handleSaveChange = async () => {
        let valid = 1;

        setErrorAvatar("");
        setErrorProfileName("");
        setErrorBiography("");
        setErrorBirthday("");
        setErrorGender("");

        if (avatar === 'avatar.png' && changeAvatar === 0) {
            setErrorAvatar("Avatar không được để trống!");
            valid = 0;
        }

        if (profileName.trim() === '') {
            setErrorProfileName("Tên hồ sơ không được để trống!");
            valid = 0;
        } else if (profileName.trim().length < 3 || profileName.trim().length > 20) {
            setErrorProfileName("Tên hồ sơ phải từ 3 - 20 kí tự!");
            valid = 0;
        } else { };

        if (birthday === null) {
            setErrorBirthday("Ngày sinh không được để trống!");
            valid = 0;
        }

        if (biography === null || biography.trim() === '') {
            setErrorBiography("Tiểu sử không được để trống!");
            valid = 0;
        } else if (biography.trim().length > 150) {
            setErrorBiography("Tiểu sử không được vượt quá 150 kí tự!");
            valid = 0;
        } else { };

        if (gender === null) {
            setErrorGender("Giới tính không được bỏ trống!");
            valid = 0;
        }


        if (valid == 1 && confirm("Bạn có chắc chắn muốn cập nhật các thông tin của người dùng này vào cơ sở dữ liệu?")) {

            var avtnew = "";

            if (selectedFile !== undefined) {
                const formData = new FormData();
                formData.append('image', selectedFile);

                //console.log(data.avatar);

                if (data.avatar != null) {
                    await axios.post("http://localhost:8080/cloudinary/delete?url=" + data.avatar, { headers: authHeader() })
                        .then(response => {
                            //console.log(response.data);
                        })
                        .catch(error => {
                            // Xử lý lỗi nếu có
                            console.error(error);
                        });
                }

                await axios.post("http://localhost:8080/cloudinary/uploadAvatar", formData, { headers: authHeader() })
                    .then(response => {
                        avtnew = response.data.url;
                        setAvatar(response.data.url);
                        data.avatar = response.data.url;
                    })
                    .catch(error => {
                        // Xử lý lỗi nếu có
                        console.error(error);
                    });
            }

            //console.log(avtnew);
            class User {
                constructor(userId, profileName, birthday, biography, gender, avatar) {
                    this.userId = userId;
                    this.profileName = profileName;
                    this.birthday = birthday;
                    this.biography = biography;
                    this.gender = gender;
                    this.avatar = avatar;
                }
            }
            const updateUser = new User(data.userId, profileName.trim(), birthday, biography.trim(), gender, avtnew != "" ? avtnew : avatar);

            await axios.post("http://localhost:8080/api/userProfile/updateProfile/" + user.id, updateUser, { headers: authHeader() })
                .then(response => {
                    // Xử lý phản hồi từ API nếu cần
                    notify('Cập nhật thành công');

                })
                .catch(error => {
                    // Xử lý lỗi nếu có
                    alert('Lỗi khi cập nhật');
                });
        }

    }

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

            <ToastContainer />

            <div className={styles.right}>
                <p className={styles.right_heading}>Sửa trang cá nhân</p>
                <div className={styles.right_prof}>
                    <div className={styles.right_prof_content}>
                        <div className={styles.right_prof_row_first}>
                            <label className={styles.right_prof_row_avatar} htmlFor="right_prof_row_avatar_src">
                                <img
                                    className={styles.right_prof_row_avatar_img}
                                    src={avatar}
                                    alt="Avatar"
                                    width={120}
                                    height={120}
                                />
                            </label>
                            <input className={styles.right_prof_row_avatar_src} accept=".jpeg, .jpg, .png" type="file" name="" id="right_prof_row_avatar_src" onChange={handleFileChange} />
                        </div>
                        <p className={styles.error_avatar}>{errorAvatar}</p>
                        <div className={styles.right_prof_row}>
                            <label htmlFor="name" className={styles.right_prof_row_label}>Tên</label>
                            <input type="text" id="name" className={styles.right_prof_row_input} value={profileName} onChange={onChangeProfileName} />
                        </div>
                        <p className={styles.error}>{errorProfileName}</p>
                        <div className={styles.right_prof_row}>
                            <label htmlFor="birthday" className={styles.right_prof_row_label}>Ngày sinh</label>
                            <input type="date" id="birthday" className={styles.right_prof_row_input} value={birthday} onChange={onChangeBirthday} />
                        </div>
                        <p className={styles.error}>{errorBirthday}</p>
                        <div className={styles.right_prof_row}>
                            <label htmlFor="biography" className={styles.right_prof_row_label}>Tiểu sử</label>
                            <textarea name="" id="biography" cols="53" rows="10" className={styles.right_prof_row_input} value={biography} onChange={onChangeBiography}></textarea>
                            <p className={styles.count_bio}>{count_bio}/150 kí tự</p>
                        </div>
                        <p className={styles.error}>{errorBiography}</p>
                        <div className={styles.right_prof_row}>
                            <label className={styles.right_prof_row_label} htmlFor="gender">Giới tính</label>
                            <div id="gender" className={styles.gender}>
                                Nam <input className={styles.gender_male} type="radio" name="gender" id="" value="Nam" checked={gender === 1} onChange={onChangeGender} />
                                Nữ <input className={styles.female} type="radio" name="gender" id="" value="Nữ" checked={gender === 0} onChange={onChangeGender} />
                            </div>
                        </div>
                        <p className={styles.error}>{errorGender}</p>
                        <button className={styles.right_prof_save} onClick={handleSaveChange}>
                            Lưu thay đổi
                        </button>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default Edit_Profile;