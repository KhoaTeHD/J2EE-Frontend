import styles from '@/styles/Recommend.module.css';
import Link from 'next/link'
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
                        <div className={styles.recommend_card}>
                            <div className={styles.recommend_card_img}><Image src="/images/avatar.png" width="100" height="100"></Image></div>
                            <div className={styles.recommend_card_information}>
                                <div className={styles.recommend_card_name}>Nguyễn Đăng Khoa</div>
                                <div className={styles.recommend_card_bio}>I am too ugly to aspire to be beautiful.</div>
                                <div className={styles.recommend_card_mutual_friends}>Có 11 Bạn chung</div>
                            </div>
                            <div className={styles.recommend_card_action}>
                                <div className={styles.recommend_card_action_button}>Thêm bạn bè</div>
                            </div>
                        </div>
                        <div className={styles.recommend_card}>
                            <div className={styles.recommend_card_img}><Image src="/images/avatar.png" width="100" height="100"></Image></div>
                            <div className={styles.recommend_card_information}>
                                <div className={styles.recommend_card_name}>Võ Văn Hùng</div>
                                <div className={styles.recommend_card_bio}>If I don't program myself, life will program me</div>
                                <div className={styles.recommend_card_mutual_friends}>Có 22 Bạn chung</div>
                            </div>
                            <div className={styles.recommend_card_action}>
                                <div className={styles.recommend_card_action_button}>Thêm bạn bè</div>
                            </div>
                        </div>
                        <div className={styles.recommend_card}>
                            <div className={styles.recommend_card_img}><Image src="/images/avatar.png" width="100" height="100"></Image></div>
                            <div className={styles.recommend_card_information}>
                                <div className={styles.recommend_card_name}>Thiều Hoàng</div>
                                <div className={styles.recommend_card_bio}>Dieu anh luon giu kin trong tim ...</div>
                                <div className={styles.recommend_card_mutual_friends}>Có 17 Bạn chung</div>
                            </div>
                            <div className={styles.recommend_card_action}>
                                <div className={styles.recommend_card_action_button}>Thêm bạn bè</div>
                            </div>
                        </div>
                        <div className={styles.recommend_card}>
                            <div className={styles.recommend_card_img}><Image src="/images/avatar.png" width="100" height="100"></Image></div>
                            <div className={styles.recommend_card_information}>
                                <div className={styles.recommend_card_name}>Nguyễn Nhật Huy</div>
                                <div className={styles.recommend_card_bio}>Toi la con lon</div>
                                <div className={styles.recommend_card_mutual_friends}>Có 10 Bạn chung</div>
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
