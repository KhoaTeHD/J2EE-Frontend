import styles from '@/styles/Post.module.css'
import Image from 'next/image';
import { useState, useEffect } from 'react';
import axios from 'axios';
import authHeader from "../api/auth-header";
import authService from '../api/auth-service';
import React from 'react';
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Post = (props) => {

    var user = authService.getCurrentUser();

    const postId = props.postId;

    const [postData, setPostData] = useState();

    const [currUserData, setCurrUserData] = useState();

<<<<<<< HEAD
    const [numLikes, setNumLikes] = useState();
=======
    const notify = (message) => toast.success(message);
>>>>>>> fea664d1c141a2cb9e6b694cd8d1deddd71e213d

    useEffect(() => {
        const fetchPostData = async () => {
            const response = await axios.get("http://localhost:8080/post/" + postId, { headers: authHeader() })
            setPostData(response.data);
        };

        const fetchCurrUserData = async () => {
            const response = await axios.get("http://localhost:8080/api/users/id/" + user.id, { headers: authHeader() })
            setCurrUserData(response.data);
        };

        fetchPostData();
        fetchCurrUserData();
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

    const handlesReaction = async () => {

        try {
            const response = await axios.get("http://localhost:8080/reaction/check", {
                headers: authHeader(),
                params: {
                    userId: currUserData.id,
                    postId: postData.id,
                },
            });
    
            const hasLiked = response.data.hasLiked; // Giả sử API trả về thông tin về việc đã like hay chưa
    
            if (hasLiked) {
                // Nếu đã like, gửi yêu cầu HTTP DELETE để xóa like
                await axios.delete("http://localhost:8080/reaction/delete", {
                    headers: authHeader(),
                    data: {
                        userId: currUserData.id,
                        postId: postData.id,
                    },
                });
    
                console.log("Reaction deleted successfully!");
            } else {
                // Nếu chưa like, thêm like bằng cách gửi yêu cầu POST
                const newComment = {
                    user: currUserData,
                    post: postData,
                };
    
                await axios.post("http://localhost:8080/reaction/new", newComment, {
                    headers: authHeader(),
                });
    
                console.log("Reaction added successfully!");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    const handleSubmit = async () => {
<<<<<<< HEAD
=======
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
        if (comment.length != "") {
            class Comment {
                constructor(commentId, content, replyFor, userId, postId) {
                    this.commentId = commentId;
                    this.content = content;
                    this.replyFor = replyFor;
                    this.userId = userId;
                    this.postId = postId;
                }
            }

            const cmt = new Comment(null, comment, null, user.id, postId);

            await axios.post("http://localhost:8080/comment/savecmt", cmt, { headers: authHeader() })
                .then(response => {
                    setComment("");
                    notify("Thêm bình luận thành công!");
                })
                .catch(error => {
                    // Xử lý lỗi nếu có
                    console.error(error);
                });
        }
>>>>>>> fea664d1c141a2cb9e6b694cd8d1deddd71e213d
    };

    const isOwner = currUserData && postData && currUserData.id === postData?.user?.id;

    const [showOptions, setShowOptions] = useState(false);

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    const handleEdit = () => {
        // Xử lý chức năng chỉnh sửa bài viết ở đây
    };

    const handleDelete = () => {
        // Xử lý chức năng xóa bài viết ở đây
    };

    const avtSrcPostUser = postData?.user?.avatar || "/images/avatar.png";
    const avtSrcCurrUser = currUserData?.avatar || "/images/avatar.png";
    //const 

    return (
        <div className={styles.container}>
            <ToastContainer />
            <div className={styles.top_container}>
                <div className={styles.user}>
                    <Image className={styles.user_avt} src={avtSrcPostUser} alt="Avatar" width="100" height="100"></Image>
                    <span className={styles.user_name}>{postData && postData.user && postData.user.profileName}</span>
                    <span className={styles.dot1}>•</span>
                    <span className={styles.time_since_post}>{time}</span>
                </div>
                {isOwner && (
                    <div className={styles.options} onClick={toggleOptions}>
                        <span className={styles.options_icon}>...</span>
                        {/* {showOptions && (

                    )} */}
                    </div>
                )}
            </div>

            <p className={styles.post_caption}>{postData && postData.caption}</p>
            <Link href={`/posts/${postId}`}>
                <div className={styles.post}>
                    <Image className={styles.post_image} src={postData && postData.media && postData.media.length === 1 && postData.media[0].path} width="1000" height="1000"></Image>
                </div>
            </Link>
            <div className={styles.like_comment}>
<<<<<<< HEAD
                <span className={styles.like_count}>{numLikes} lượt thích</span>
                <span className={styles.comment_count}>{postData && postData.comments.length} bình luận</span>
=======
                <span className={styles.like_count}>{postData && postData.likes && postData.likes.length} lượt thích</span>
                <span className={styles.comment_count}>{postData && postData.comments && postData.comments.length} bình luận</span>
>>>>>>> fea664d1c141a2cb9e6b694cd8d1deddd71e213d
            </div>
            <div className={styles.actions}>
                <Image className={styles.action} src="/icons/post_heart.png" alt="like" width="32" height="32" onClick={handlesReaction}/>

                <Link href={`/posts/${postId}`}>
                    <Image className={styles.action} src="/icons/post_comment.png" alt="comment" width="32" height="32" />
                </Link>

                <Image className={styles.action} src="/icons/post_share.png" alt="share" width="32" height="32" />
            </div>
            <div className={styles.comment}>
                <Image className={styles.comment_user_avt} src={avtSrcCurrUser} alt="Avatar" width="100" height="100"></Image>
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
