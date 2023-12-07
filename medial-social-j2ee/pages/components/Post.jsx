import styles from '@/styles/Post.module.css'
import Image from 'next/image';
import { useState, useEffect } from 'react';
import axios from 'axios';
import authHeader from "../api/auth-header";
import authService from '../api/auth-service';
import React from 'react';
import Link from "next/link";

const Post = (props) => {

    //var user = authService.getCurrentUser();
    const postId = props.postId;
    const postUserId = props.userId;

    const [postData, setPostData] = useState();
    const [postUserData, setPostUserData] = useState();

    useEffect(() => {
        const fetchPostData = async () => {
            const response = await axios.get("http://localhost:8080/post/" + postId, { headers: authHeader() })
            setPostData(response.data);
        };

        const fetchPostUserData = async () => {
            const response = await axios.get("http://localhost:8080/api/users/id/" + postUserId, { headers: authHeader() })
            setPostUserData(response.data);
        };

        fetchPostData();
        fetchPostUserData();
    }, []);

    function timeSincePost(postTime) {
        const postDate = new Date(postTime);
        const currentDate = new Date();

        const timeDifference = currentDate.getTime() - postDate.getTime();

        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30);
        const years = Math.floor(months / 12);

        if (years > 0) {
            return `${years} năm trước`;
        } else if (months > 0) {
            return `${months} tháng trước`;
        } else if (days > 0) {
            return `${days} ngày trước`;
        } else if (hours > 0) {
            return `${hours} giờ trước`;
        } else if (minutes > 0) {
            return `${minutes} phút trước`;
        } else {
            return `${seconds} giây trước`;
        }
    }

    const time = timeSincePost(postData && postData.createdDate);

    const [comment, setComment] = useState('');

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleSubmit = async () => {
        // try {

        //     const newComment = {
        //         userId: user.id,
        //         postId: postId,
        //         content: comment
        //     };

        //     const response = await axios.post('', newComment);
        //     console.log('Bình luận đã được thêm:', response.data);
        //     setComment('');
        // } catch (error) {
        //     console.error('Lỗi khi thêm bình luận:', error);
        // }
    };

    return (
        <div className={styles.container}>
            <div className={styles.user}>
                <Image className={styles.user_avt} src="/images/avatar.png" alt="Avatar" width="100" height="100"></Image>
                <span className={styles.user_name}>{postUserData && postUserData.profileName}</span>
                <span className={styles.dot}>•</span>
                <span className={styles.time_since_post}>{time}</span>
            </div>
            <p className={styles.post_caption}>{postData && postData.caption}</p>
            <Link href={`/posts/${postId}`}>
                <div className={styles.post}>
                    <Image className={styles.post_image} src={postData && postData.media.length === 1 && postData.media[0].path} width="1000" height="1000"></Image>
                </div>
            </Link>
            <div className={styles.like_comment}>
                <span className={styles.like_count}>{postData && postData.likes.length} lượt thích</span>
                <span className={styles.comment_count}>{postData && postData.comments.length} bình luận</span>
            </div>
            <div className={styles.actions}>
                <Image className={styles.action} src="/icons/post_heart.png" alt="" width="32" height="32" />

                <Link href={`/posts/${postId}`}>
                    <Image className={styles.action} src="/icons/post_comment.png" alt="" width="32" height="32" />
                </Link>

                <Image className={styles.action} src="/icons/post_share.png" alt="" width="32" height="32" />
            </div>
            <div className={styles.comment}>
                <Image className={styles.comment_user_avt} src="/images/avatar.png" alt="Avatar" width="100" height="100"></Image>
                {/* <input className={styles.comment_input} type="text" placeholder="Viết bình luận..."/> */}
                <div className={styles.comment_area}>
                    <textarea className={styles.comment_textarea} value={comment} onChange={handleCommentChange} placeholder="Viết bình luận..." />
                    {comment.trim() !== '' && ( // Hiển thị nút gửi khi có nội dung trong textarea
                        <button onClick={handleSubmit} className={styles.submit_button}>
                            Gửi
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Post