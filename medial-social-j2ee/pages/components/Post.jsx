import styles from '@/styles/Post.module.css'
import Image from 'next/image';
import { useState, useEffect } from 'react';
import axios from 'axios';
import authHeader from '../api/auth-header';
import authService from '../api/auth-service';
import React from 'react';
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { set } from 'date-fns';
import { button } from 'react-validation/build/button';
import ConfirmationDialog from './ConfirmationDialog';
import EditPost from './EditPost';

const Post = (props) => {

    var user = authService.getCurrentUser();

    const postId = props.postId;

    const [postData, setPostData] = useState();

    const [currUserData, setCurrUserData] = useState();

    const [numLikes, setNumLikes] = useState();

    const notifyDelete = (message) => toast.success(message, { autoClose: 400 });

    const notify = (message) => toast.success(message);

    const [liked, setLiked] = useState(false);

    const [isEdit, setIsEdit] = useState(false);

    const [dependency, setDependency] = useState(0);

    useEffect(() => {
        const fetchPostData = async () => {
            const response = await axios.get("http://localhost:8080/post/" + postId, { headers: authHeader() })
            setPostData(response.data);
            const numL = response.data?.likes?.length;
            setNumLikes(numL);
        };

        const fetchCurrUserData = async () => {
            const response = await axios.get("http://localhost:8080/api/users/id/" + user.id, { headers: authHeader() })
            setCurrUserData(response.data);
        };

        const fetchLikedData = async () => {
            const response = await axios.get("http://localhost:8080/reaction/check", {
                headers: authHeader(),
                params: {
                    userId: user.id,
                    postId: postId,
                },
            });

            setLiked(response.data);
        };

        fetchPostData();
        fetchCurrUserData();
        fetchLikedData();
    }, [dependency]);

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
                    userId: user.id,
                    postId: postId,
                },
            });

            const hasLiked = response.data;

            if (hasLiked) {

                await axios.delete("http://localhost:8080/reaction/delete", {
                    headers: authHeader(),
                    params: {
                        userId: user.id,
                        postId: postId,
                    },
                });
                console.log("Reaction deleted successfully!");

            } else {
                const newComment = {
                    user: currUserData,
                    post: postData,
                };
                await axios.post("http://localhost:8080/reaction/new", newComment, { headers: authHeader() });
            }
            setDependency(prevDependency => prevDependency + 1);
        }
        catch (error) {
            console.error(error);
        }
    }

    const handleSubmit = async () => {
        if (comment.trim().length != "") {
            class Comment {
                constructor(commentId, content, replyFor, userId, postId) {
                    this.commentId = commentId;
                    this.content = content;
                    this.replyFor = replyFor;
                    this.userId = userId;
                    this.postId = postId;
                }
            }

            const cmt = new Comment(null, comment.trim(), null, user.id, postId);

            await axios.post("http://localhost:8080/comment/savecmt", cmt, { headers: authHeader() })
                .then(response => {
                    setComment("");
                    notify("Thêm bình luận thành công!");
                })
                .catch(error => {
                    // Xử lý lỗi nếu có
                    console.error(error);
                });

            setDependency(prevDependency => prevDependency + 1);
        }
    };

    const isOwner = postData && postData.user && user && user.id === postData.user.userId;

    const [showOptions, setShowOptions] = useState(false);

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    const handleEdit = () => {
        setIsEdit(true);
        setShowOptions(false);
    };

    const closeEdit = () => {
        setIsEdit(false);
    }

    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleCancelDelete = () => {
        setShowConfirmation(false);
        setShowOptions(false);
    }

    const handleConfirmDelete = async () => {
        await axios.delete("http://localhost:8080/post/" + postId, { headers: authHeader() })
            .then(response => {
                setShowConfirmation(false);
                setShowOptions(false);
                notifyDelete("Xóa bài viết thành công!");
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            })
            .catch(error => {
                console.error(error);
            });
    }

    const handleDelete = () => {
        setShowOptions(false);
        setShowConfirmation(true);

    };

    const avtSrcPostUser = postData?.user?.avatar || "/images/avatar.png";
    const avtSrcCurrUser = currUserData?.avatar || "/images/avatar.png";
    const iconLikeSrc = liked ? '/icons/post_ping_heart.png' : '/icons/post_heart.png';

    const linkHref = postData?.user?.userId ? `/profile/${postData.user.userId}` : ``;
    //const 
    const isVideo = postData && postData.media && postData.media.length === 1 && postData.media[0].type === "Video";

    return (
        <div className={styles.container}>
            <ToastContainer />
            {showConfirmation && (
                <ConfirmationDialog
                    message="Bạn có chắc chắn muốn xóa?"
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            )}

            {isEdit && (
                <EditPost postId = {props.postId} onClose = {closeEdit}/>
            )}

            {showOptions && (
                <div className={styles.overlay}>
                    <div className={styles.options_container}>
                        <span className={styles.delete_option} onClick={handleDelete} >Xóa</span>
                        <span className={styles.edit_option} /*onClick={handleEdit}*/ >Sửa</span>
                        <span className={styles.cancel_option} onClick={toggleOptions} >Hoàn tác</span>
                    </div>
                </div>
            )}
            <div className={styles.top_container}>
                <div className={styles.user}>
                    <Link className={styles.link} href={linkHref}>
                        <Image className={styles.user_avt} src={avtSrcPostUser} alt="Avatar" width="100" height="100"></Image>
                    </Link>
                    <Link className={styles.link} href={linkHref}>
                        <span className={styles.user_name}>{postData && postData.user && postData.user.profileName}</span>
                    </Link>
                    <span className={styles.dot1}>•</span>
                    <span className={styles.time_since_post}>{time}</span>
                </div>
                {isOwner && (
                    <div className={styles.options} onClick={toggleOptions}>
                        <span className={styles.options_icon}>•••</span>
                    </div>
                )}
            </div>

            <p className={styles.post_caption}>{postData && postData.caption}</p>
            {!isVideo ? (
                <div className={styles.post}>
                    <Link href={`/posts/${postId}`}>
                        <Image
                            className={styles.post_image}
                            src={postData && postData.media && postData.media.length === 1 && postData.media[0].path}
                            width={1000}
                            height={1000}
                        />
                    </Link>
                </div>
            ) : (
                <div className={styles.post}>
                    <video className={styles.post_video} controls>
                        {postData && postData.media && postData.media.length === 1 && postData.media[0].path ? (
                            <source
                                src={postData.media[0].path}
                                type="video/mp4"
                            />
                        ) : (
                            <p>Your browser does not support the video tag or the video is unavailable.</p>
                        )}
                    </video>
                </div>
            )}

            <div className={styles.like_comment}>
                <span className={styles.like_count}>{numLikes} lượt thích</span>
                <span className={styles.comment_count}>{postData && postData.comments && postData.comments.length} bình luận</span>
            </div>
            <div className={styles.actions}>
                <Image className={styles.action} src={iconLikeSrc} alt="like" width="32" height="32" onClick={handlesReaction} />

                <Link href={`/posts/${postId}`}>
                    <Image className={styles.action} src="/icons/post_comment.png" alt="comment" width="32" height="32" />
                </Link>

                {/* <Image className={styles.action} src="/icons/post_share.png" alt="share" width="32" height="32" /> */}
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