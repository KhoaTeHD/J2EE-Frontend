import styles from '@/styles/Recommend.module.css';
import Image from 'next/image';

const Recommend = () => {
    return (
        <div className={styles.container_bottom}>
                <div className={styles.container_friendlist}>
                    <div className={styles.friendlist_label}>Gợi ý</div>
                    <div className={styles.FriendList}>
                        <div className={styles.recommend_card}>
                            <div className={styles.recommend_card_img}><Image src="/images/avatar.png" width="100" height="100"></Image></div>
                            <div className={styles.recommend_card_information}>
                                <div className={styles.recommend_card_name}>Võ Quang Đăng Khoa</div>
                                <div className={styles.recommend_card_bio}>If the path to what you want seems too easy, Then you're on the wrong path</div>
                                <div className={styles.recommend_card_mutual_friends}>Có 8 Bạn chung</div>
                            </div>
                            <div className={styles.recommend_card_action}>
                                <div className={styles.recommend_card_action_button}>Thêm bạn bè</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default Recommend
