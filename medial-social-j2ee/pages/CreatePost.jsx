import styles from '@/styles/CreatePost.module.css'
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import authHeader from "./api/auth-header";
import authService from './api/auth-service';
import { format } from 'date-fns';
import SavePostSuccessPopup from './components/SavePostSuccessPopup';

const CreatePost = () => {

    var curentUser = authService.getCurrentUser();

    const [user, setUser] = useState();

    const [selectedImages, setSelectedImages] = useState([]);

    const [showNotification, setShowNotification] = useState(false);

    const handleNotificationClose = () => {
        setShowNotification(false);
        // Redirect to home page or perform necessary actions here
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await axios.get("http://localhost:8080/api/users/id/" + curentUser.id, { headers: authHeader() })
            setUser(response.data);
        };

        fetchUserData();
    }, []);

    const handleImageChange = (event) => {
        const files = event.target.files;
        const imagesArray = [];

        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();

            reader.onload = (e) => {
                imagesArray.push(e.target.result);

                if (imagesArray.length === files.length) {
                    setSelectedImages([...selectedImages, ...imagesArray]);
                }
            };

            reader.readAsDataURL(files[i]);
        }
    };

    const [text, setText] = useState('');

    const handleInputChange = (event) => {
        setText(event.target.value); 
    };

    const currentDate = new Date();

    const formattedDate = format(currentDate, 'yyyy-MM-dd HH:mm:ss');

    const saveNewPost = () => {
        const post = {
            user: user,
            caption: text,
            createdDate: formattedDate
        };

        axios.post('http://localhost:8080/post/newpost', post, { headers: authHeader() })
            .then(response => {
                console.log('Bài viết đã được thêm:', response.data);
                setShowNotification(true);
            })
            .catch(error => {
                console.error('Lỗi khi thêm bài viết:', error);
            });
    };

    return (
        <div className={styles.container}>
            {showNotification && (
                <>
                    <div className={styles.overlay} />
                    <SavePostSuccessPopup
                        message="Bài viết đã được đăng thành công!"
                        onClose={handleNotificationClose}
                    />
                </>
            )}
            <Image className={styles.close_button} src="/icons/close.png" width="20" height="20"></Image>
            <div class={styles.post_container}>
                <div className={styles.head}>
                    <span className={styles.head_text}>Tạo bài viết</span>
                </div>
                <div className={styles.user}>
                    <Image className={styles.user_avt} src="/images/avatar.png" alt="Avatar" width="100" height="100"></Image>
                    <span className={styles.user_name}>{curentUser.profileName}</span>
                </div>
                <div className={styles.post_content}>
                    {/* <p className={styles.pots_caption} contenteditable="true" onFocus={handleFocus} onBlur={handleBlur} onInput={handleChange}>{content}</p> */}

                    <textarea className={styles.post_caption} value={text} onChange={handleInputChange} placeholder='Bạn đang nghĩ gì ?'></textarea>

                    {selectedImages.length > 0 && (
                        <div className="selected_image_container">
                            {selectedImages.map((image, index) => (
                                <img key={index} src={image} alt={`Selected ${index}`} />
                            ))}
                        </div>
                    )}

                    <input type="file" accept="image/*" id="image_upload" onChange={handleImageChange} style={{ display: 'none' }} />
                    <label for="image_upload" className={styles.upload_image_button}>Thêm hình ảnh</label>
                </div>
                <button onClick={saveNewPost} >Đăng bài</button>
            </div>
        </div>
    );
}

export default CreatePost