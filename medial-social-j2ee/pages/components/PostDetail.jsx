import styles from '@/styles/PostDetail.module.css'
import Image from 'next/image';
import UserComment from './UserComment';

const PostDetail = () => {

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
                        <span className={styles.user_name}>Nguyễn Nhật Huy</span>
                        <span className={styles.dot}>•</span>
                        <span className={styles.time_since_post}>1h</span>
                    </div>
                    <p className={styles.post_caption}>Chung ta khong giong nhau</p>

                    <div className={styles.post_comments}>
                        <UserComment/>
                        <UserComment/>
                        <UserComment/>
                    </div>

                    <div className={styles.left_bottom}>
                        <div className={styles.like_comment}>
                            <span className={styles.like_count}>10 likes</span>
                            <span className={styles.comment_count}>3 comments</span>
                        </div>
                        <div className={styles.actions}>
                            <Image className={styles.action} src="/icons/post_heart.png" alt="" width="32" height="32" />
                            <Image className={styles.action} src="/icons/post_comment.png" alt="" width="32" height="32" />
                            <Image className={styles.action} src="/icons/post_share.png" alt="" width="32" height="32" />
                        </div>
                        <div className={styles.comment}>
                            <Image className={styles.comment_user_avt} src="/images/avatar.png" alt="Avatar" width="100" height="100"></Image>
                            <input className={styles.comment_input} type="text" placeholder="Viết bình luận..." />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostDetail