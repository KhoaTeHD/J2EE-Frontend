import styles from '@/styles/UserComment.module.css'
import Image from 'next/image';

const UserComment = () => {

    return (
        <div className={styles.container}>
            <div className={styles.user_avt}>
                <Image className={styles.comment_user_avt} src="/images/avatar.png" alt="Avatar" width="100" height="100"></Image>
            </div>
            <div className={styles.user_name_comment}>
                <div className={styles.user_name}>HuyProVipNo1</div>
                <div className={styles.user_comment}>Kimochi</div>
            </div>
        </div>
    );
}

export default UserComment