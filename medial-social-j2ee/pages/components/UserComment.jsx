import styles from '@/styles/UserComment.module.css'
import Image from 'next/image';

const UserComment = (props) => {

    //const profileName = props.profileName;

    return (
        <div className={styles.container}>
            <div className={styles.user_avt}>
                <Image className={styles.comment_user_avt} src={props.val?.user?.avatar || "/images/avatar.png"} alt="Avatar" width="100" height="100"></Image>
            </div>
            <div className={styles.user_name_comment}>
                <div className={styles.user_name}>{props.val.user.profileName}</div>
                <div className={styles.user_comment}>{props.val.content}</div>
            </div>
        </div>
    );
}

export default UserComment