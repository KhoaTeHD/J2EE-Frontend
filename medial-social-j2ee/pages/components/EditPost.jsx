import styles from '@/styles/EditPost.module.css'
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import authHeader from '../api/auth-header';
import authService from '../api/auth-service';
import { format } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditPost = (props) => {

    const waitTime = 1500;

    const notify = (message) => toast.warn(message);

    const notifySuccess = (message) => {
        toast.success(message, { autoClose: waitTime });
        setTimeout(() => {
            //window.location.href = '/Homepage'; // Điều hướng đến trang chủ
            window.location.reload();
        }, waitTime);
    }
    
    var curentUser = authService.getCurrentUser();

    const [data, setData] = useState();

    const [currUserData, setCurrUserData] = useState();

    const [user, setUser] = useState();

    const [overlay, setOverlay] = useState(false);

    const [selectedImage, setSelectedImage] = useState();

    const [selectedImageURL, setSelectedImageURL] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const [selectedMediaType, setSelectedMediaType] = useState('');

    const [windowHeight, setWindowHeight] = useState();

    const [text, setText] = useState('');

    const [dependency, setDependency] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            setWindowHeight(window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/post/${props.postId}`, { headers: authHeader() });
                setData(response.data);
                setText(data.caption);
                console.log(data);  
            } catch (error) {
            }
        };
        const fetchCurrUserData = async () => {
            const response = await axios.get("http://localhost:8080/api/users/id/" + curentUser.id, { headers: authHeader() })
            setCurrUserData(response.data);
        };

        fetchCurrUserData();
        fetchData();
    }, [dependency]);

    const clearSelectedImage = () => {
        setSelectedImage(null);
        setSelectedImageURL('');
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
    
        const type = file.type.split('/')[0]; // Lấy loại phương tiện (image hoặc video)
        setSelectedMediaType(type);
    
        const mediaURL = URL.createObjectURL(file);
        setSelectedImageURL(mediaURL);
    };


    const handleInputChange = (event) => {
        setText(event.target.value);
    };

    const editPost = async () => {

        setIsLoading(true);

        if (!selectedImage && !text) {
            setIsLoading(false);
            notify("Vui lòng thêm caption hoặc file trước khi đăng bài!");
            return;
        }

        // const media = {
        //     path: "",
        //     type: selectedMediaType === 'image' ? "Image" : "Video",
        //     postid: ""
        // };

        // const post = {
        //     user: user,
        //     caption: text,
        //     createdDate: formattedDate,
        // };

        // const formData = new FormData();
        // formData.append('image', selectedImage);

        // await axios.post("http://localhost:8080/cloudinary/upload", formData, { headers: authHeader() })
        //     .then(response => {
        //         media.path = response.data.url;
        //     })
        //     .catch(error => {
        //         console.error(error);
        //     });

        // await axios.post('http://localhost:8080/post/newpost', post, { headers: authHeader() })
        //     .then(response => {
        //         console.log('Bài viết đã được thêm:', response.data);
        //         media.postid = response.data;
        //     })
        //     .catch(error => {
        //         console.error('Lỗi khi thêm bài viết:', error);
        //     });

        // console.log(media);

        // await axios.post('http://localhost:8080/media/newmedia', media, { headers: authHeader() })
        //     .then(response => {
        //         setIsLoading(false);
        //         notifySuccess("Đăng bài thành công!");
        //         setOverlay(true);
        //     })
        //     .catch(error => {
        //         setIsLoading(false);
        //         console.error('Lỗi khi thêm bài viết:', error);
        //     });

    };

    // Tính toán chiều cao tối đa của hình ảnh
    const maxImageHeight = windowHeight * 0.55;

    return (
        <div className={styles.container}>

            {overlay && (
                <div className={styles.overlay}></div>
            )}

            <ToastContainer />
            {isLoading && (
                <div className={styles.loading}>
                    <div className={styles.spinner}></div>
                </div>
            )}

            <Image className={styles.close_button} src="/icons/close.png" width="20" height="20" onClick={props.onClose}></Image>
            <div class={styles.post_container}>
                <div className={styles.head}>
                    <span className={styles.head_text}>Sửa bài viết</span>
                </div>
                <div className={styles.user}>
                    <Image className={styles.user_avt} src={user?.avatar || "/images/avatar.png"} width="100" height="100"></Image>
                    <span className={styles.user_name}>{curentUser && curentUser.profileName}</span>
                </div>
                <div className={styles.post_content}>
                    {/* <p className={styles.pots_caption} contenteditable="true" onFocus={handleFocus} onBlur={handleBlur} onInput={handleChange}>{content}</p> */}

                    <textarea className={styles.post_caption} value={ text && text } onChange={handleInputChange} placeholder='Bạn đang nghĩ gì ?'></textarea>

                    {selectedImageURL && (
                        <div className={styles.selected_media_preview}>
                            {selectedMediaType === 'image' ? (
                                /* Hiển thị hình ảnh đã chọn */
                                <img src={selectedImageURL} alt="Selected Image" style={{ maxHeight: `${maxImageHeight}px` }} />
                            ) : (
                                /* Hiển thị video đã chọn */
                                <video controls className={styles.selected_video}>
                                    <source src={selectedImageURL} type={selectedImage?.type} />
                                    Your browser does not support the video tag.
                                </video>
                            )}
                        </div>
                    )}

                    <input type="file" accept="image/*, video/*" id="image_upload" onChange={handleImageChange} style={{ display: 'none' }} />
                    <label for="image_upload" className={styles.upload_image_button}>Chọn ảnh/video</label>
                    {selectedImageURL && (
                        <label onClick={clearSelectedImage} className={styles.delete_image_button}>Bỏ chọn</label>
                    )}
                </div>
                <button onClick={editPost} >Sửa bài viết</button>
            </div>
        </div>
    );
}

export default EditPost