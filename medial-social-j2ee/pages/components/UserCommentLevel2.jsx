import styles from '@/styles/UserComment.module.css'
import Image from 'next/image';
import AuthService from '../api/auth-service';
import authHeader from "../api/auth-header";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

const UserComment = (props) => {

    var user = AuthService.getCurrentUser();
    const notify = (message) => toast.success(message, { autoClose: 500 });

    const isCurrentUser = (user && props.val.user.userId === user.id) || (user && props.userIdOfPost === user.id);

    const handleDelButton = async () => {
        await axios.delete("http://localhost:8080/comment/delete/" + props.val.commentId, { headers: authHeader() })
            .then(response => {
                props.onDelete();
                notify("Bạn vừa xóa một bình luận!");
            })
            .catch(error => {
                // Xử lý lỗi nếu có
                console.error(error);
            });
    }

    return (
        <div className={styles.container_cmt_outer}>
            <div className={styles.container_cmt}>
                <div className={styles.user_avt}>
                    <Link className={styles.link} href={`/profile/${props.val.user.userId}`}>
                        <Image className={styles.comment_user_avt} src={props.val?.user?.avatar || "/images/avatar.png"} alt="Avatar" width="100" height="100"></Image>
                    </Link>

                </div>
                <div className={styles.user_cmt_container}>
                    <div className={styles.user_name_comment}>
                        <Link className={styles.link} href={`/profile/${props.val.user.userId}`}>
                            <div className={styles.user_name}>{props.val.user.profileName}</div>
                        </Link>
                        <div className={styles.user_comment}>{props.val.content}</div>
                    </div>
                    <div className={styles.action}>
                        {isCurrentUser && <button onClick={handleDelButton}>Xóa</button>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserComment