import styles from '@/styles/PostDetail.module.css'
import Image from 'next/image';
import UserComment from '../components/UserComment';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import authHeader from "../api/auth-header";
import authService from '../api/auth-service';

const Post = () => {
    
    const router = useRouter();
    const { postId } = router.query;

    const [data, setData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("http://localhost:8080/post/" + postId, { headers: authHeader() })
            console.log(response.data);
            setData(response.data);
            console.log(data);
        };

        fetchData();
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

    const time = timeSincePost(data && data.createdDate);

    const commentInputRef = useRef(null);

    const handleCommentClick = () => {
        if (commentInputRef.current) {
            commentInputRef.current.focus();
        }
    };

    return (
        <div className={styles.container}>
            <Image className={styles.close_button} src="/icons/close.png" width="20" height="20"></Image>
            <div className={styles.post_container}>
                <div className={styles.post}>
                    <Image className={styles.post_image} src="/images/test_post_img.jpg" width="1000" height="1000"></Image>
                </div>
                <div className={styles.left_img}>
                    <div className={styles.user}>
                        <Image className={styles.user_avt} src="/images/avatar.png" alt="Avatar" width="100" height="100"></Image>
                        <span className={styles.user_name}>{data && data.user.profileName}</span>
                        <span className={styles.dot}>•</span>
                        <span className={styles.time_since_post}>{time}</span>
                    </div>
                    <p className={styles.post_caption}>{data && data.caption}</p>

                    <div className={styles.post_comments}>
                        {
                            // data && data.comments.length === 0 ? (
                            //     <p className={styles.be_the_first}>Hãy là người bình luận đầu tiên</p>
                            // ) : (
                            //     data.comments.map((val) => (<UserComment ></UserComment>))
                            // )
                        
                            data && data.comments.map((val) => (<UserComment val = {val} ></UserComment>))
                        }
                    </div>

                    <div className={styles.left_bottom}>
                        <div className={styles.like_comment}>
                            <span className={styles.like_count}>{data && data.likes.length} lượt thích</span>
                            <span className={styles.comment_count}>{data && data.comments.length} bình luận</span>
                        </div>
                        <div className={styles.actions}>
                            <Image className={styles.action} src="/icons/post_heart.png" alt="" width="32" height="32" />
                            <Image className={styles.action} src="/icons/post_comment.png" alt="" width="32" height="32" onClick={handleCommentClick}/>
                            <Image className={styles.action} src="/icons/post_share.png" alt="" width="32" height="32" />
                        </div>
                        <div className={styles.comment}>
                            <Image className={styles.comment_user_avt} src="/images/avatar.png" alt="Avatar" width="100" height="100"></Image>
                            <input ref={commentInputRef} className={styles.comment_input} type="text" placeholder="Viết bình luận..." />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post