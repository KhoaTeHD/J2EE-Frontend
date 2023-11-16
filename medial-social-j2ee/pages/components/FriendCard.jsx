import styles from '@/styles/Recommend.module.css';
import Link from 'next/link'
import { useState } from 'react';

const FriendCard = () => {
    
    const [user,setUser]= useState({});



    return (
        <div className={styles.recommend_card}>
            <div className={styles.recommend_card_img}><Image src="/images/avatar.png" width="100" height="100"></Image></div>
            <div className={styles.recommend_card_information}>
                <div className={styles.recommend_card_name}>{user.profile_name}</div>
                <div className={styles.recommend_card_bio}>{user.biography}</div>
                <div className={styles.recommend_card_mutual_friends}>Có 8 Bạn chung</div>
            </div>
            <div className={styles.recommend_card_action}>
                <div className={`${styles.recommend_card_action_button} ${styles.warning}`}>Hủy kết bạn</div>
                <div className={styles.recommend_card_action_button}>Nhắn tin</div>
            </div>
        </div>
    );
}

export default FriendCard
