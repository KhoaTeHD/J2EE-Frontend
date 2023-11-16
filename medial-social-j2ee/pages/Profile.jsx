import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from '@/styles/Profile.module.css'
import Post from "./components/Post";

const Profile = () => {
    return (
        <div className={styles.profile}>
            <style jsx global>{`
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }                
            `}</style>
            <div className={styles.top}>
                <div className={styles.avatar}>
                    <div className={styles.avatar_src}>
                        <Image src="/images/avatar.png" width="120" height="120"></Image>
                    </div>

                    <p className={styles.name}>Võ Quang Đăng Khoa</p>
                </div>

                <div className={styles.info}>
                    <div className={styles.info_top}>
                        <Link className={styles.edit} href={"/Edit_Profile"}>
                            <p>Chỉnh sửa</p>
                        </Link>
                        <p className={styles.num_post}>05 bài viết</p>
                        <Link className={styles.num_friends} href={"/FriendList"}>
                            <p>10 bạn bè</p>
                        </Link>
                    </div>
                    <p className={styles.biography}>Chỉ cần tìm được chút rực rỡ giữa đống tro tàn. Nguyện một lòng ngắm nhìn cho đến khi nó tự mình tàn đi, không để lại chút dấu vết.</p>
                </div>
            </div>

            <div className={styles.center}>
                <div className={styles.center_text}>Bài viết</div>
                <div className={styles.center_border}></div>
            </div>

            <div className={styles.posts}>
                <Post />
                <Post />
            </div>
        </div>
    )
}

export default Profile;