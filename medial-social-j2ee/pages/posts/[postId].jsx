import styles from '@/styles/PostDetail.module.css'
import Image from 'next/image';
import UserComment from '../components/UserComment';
import UserCommentLevel2 from '../components/UserCommentLevel2';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import authHeader from "../api/auth-header";
import authService from '../api/auth-service';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

var reply = null;

var numComment = 0;

const Post = () => {

    var user = authService.getCurrentUser();

    const router = useRouter();
    const notify = (message) => toast.success(message, { autoClose: 500 });

    const { postId } = router.query;

    const [data, setData] = useState();

    const [currUserData, setCurrUserData] = useState();

    const [key, setKey] = useState(true);

    const [selectedComponent, setSelectedComponent] = useState(null);

    useEffect(() => {

        const fetchData = async () => {
            if (postId) { // Kiểm tra xem postId có tồn tại không trước khi gọi API
                try {
                    const response = await axios.get(`http://localhost:8080/post/${postId}`, { headers: authHeader() });
                    setData(response.data);
                } catch (error) {
                    // Xử lý lỗi khi gọi API
                    console.error('Error fetching data:', error);
                }
            }
        };
        const fetchCurrUserData = async () => {
            const response = await axios.get("http://localhost:8080/api/users/id/" + user.id, { headers: authHeader() })
            setCurrUserData(response.data);
        };

        fetchData();
        fetchCurrUserData();
    }, [key, postId, currUserData]);


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

    let handleReceiveData = (dataFromUserComment) => {
        handleCommentClick(); // Lưu dữ liệu từ UserComment vào state
        reply = dataFromUserComment;
        setSelectedComponent(reply);
    };

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

            const replyFor = reply;

            const cmt = new Comment(null, comment, replyFor, user.id, postId);

            await axios.post("http://localhost:8080/comment/savecmt", cmt, { headers: authHeader() })
                .then(response => {
                    setComment("");
                    setKey(!key);
                    reply = null;
                    notify("Thêm bình luận thành công!");
                })
                .catch(error => {
                    // Xử lý lỗi nếu có
                    console.error(error);
                });
        }
    };

    const handleCommentDelete = () => {
        setKey(!key);
    };

    const [comment, setComment] = useState('');

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    return (
        <div className={styles.container}>
            <ToastContainer />
            <Image className={styles.close_button} src="/icons/close.png" width="20" height="20"></Image>
            <div className={styles.post_container}>
                <div className={styles.post}>
                    {data && data.media && data.media[0] && data.media[0].path && (
                        <Image className={styles.post_image} src={data.media[0].path} width="1000" height="1000" />
                    )}
                </div>
                <div className={styles.left_img}>
                    <div className={styles.user}>
                        <Image className={styles.user_avt} src={data?.user?.avatar || "/images/avatar.png"} width="100" height="100"></Image>
                        <span className={styles.user_name}>{data && data.user.profileName}</span>
                        <span className={styles.dot}>•</span>
                        <span className={styles.time_since_post}>{time}</span>
                    </div>
                    <p className={styles.post_caption}>{data && data.caption}</p>

                    <div className={styles.post_comments}>
                        <div className={styles.post_comments_inner}>
                            {
                                // data && data.comments.length === 0 ? (
                                //     <p className={styles.be_the_first}>Hãy là người bình luận đầu tiên</p>
                                // ) : (
                                //     data.comments.map((val) => (<UserComment ></UserComment>))
                                // )

                                // data && data.comments.map((val) => (
                                //     <UserComment val={val} userIdOfPost={data.user.userId} onDelete={handleCommentDelete} sendDataToPost={handleReceiveData}></UserComment>
                                // ))
                                data && data.comments.map((val) => {
                                    if (val.replies.length === 0) {
                                        return (
                                            <UserComment
                                                key={val.id}
                                                val={val}
                                                userIdOfPost={data.user.userId}
                                                onDelete={handleCommentDelete}
                                                sendDataToPost={handleReceiveData}
                                                isSelected={selectedComponent === val.commentId}
                                            ></UserComment>
                                        );
                                    }
                                    const arrPush = [];

                                    arrPush.push(<UserComment
                                        key={val.id}
                                        val={val}
                                        userIdOfPost={data.user.userId}
                                        onDelete={handleCommentDelete}
                                        sendDataToPost={handleReceiveData}
                                        isSelected={selectedComponent === val.commentId}
                                    ></UserComment>);

                                    {
                                        val.replies.map((reply) => (
                                            arrPush.push(<UserCommentLevel2
                                                key={reply.id}
                                                val={reply}
                                                userIdOfPost={data.user.userId}
                                                onDelete={handleCommentDelete}
                                                sendDataToPost={handleReceiveData}
                                            ></UserCommentLevel2>)
                                        ))
                                    }

                                    return arrPush; // Trả về null nếu không thỏa mãn điều kiện
                                })
                            }
                        </div>
                    </div>

                    <div className={styles.left_bottom}>
                        <div className={styles.like_comment}>
                            <span className={styles.like_count}>{data && data.likes.length} lượt thích</span>
                            <span className={styles.comment_count}>{data && data.comments.length} bình luận</span>
                        </div>
                        <div className={styles.actions}>
                            <Image className={styles.action} src="/icons/post_heart.png" alt="" width="32" height="32" />
                            <Image className={styles.action} src="/icons/post_comment.png" alt="" width="32" height="32" onClick={handleCommentClick} />
                            <Image className={styles.action} src="/icons/post_share.png" alt="" width="32" height="32" />
                        </div>
                        <div className={styles.comment}>
                            <Image className={styles.comment_user_avt} src={currUserData?.avatar || "/images/avatar.png"} alt="Avatar" width="100" height="100"></Image>
                            {/* <input ref={commentInputRef} className={styles.comment_input} type="text" placeholder="Viết bình luận..." /> */}
                            <textarea ref={commentInputRef} className={styles.comment_textarea} value={comment} onChange={handleCommentChange} placeholder="Viết bình luận..." />
                            {comment.trim() !== '' && (
                                <button onClick={handleSubmit} className={styles.submit_button}>
                                    Gửi
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post