import React from "react";
import Link from "next/link";
import styles from '@/styles/Profile.module.css';
import authHeader from "../api/auth-header";
import Post from "../components/Post";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Profile = () => {

    const [data, setData1] = useState([]);
    const [num_friends, setData2] = useState([]);
    const [num_posts, setData3] = useState([]);
    const router = useRouter();
    const { userId } = router.query;

    useEffect(() => {
        const fetchData = async () => {
            const response1 = await axios.get("http://localhost:8080/api/userProfile/id/" + userId, { headers: authHeader() })
            setData1(response1.data);
            const response2 = await axios.get("http://localhost:8080/api/userProfile/numFriends/" + userId, { headers: authHeader() })
            setData2(response2.data);
            const response3 = await axios.get("http://localhost:8080/api/userProfile/numPost/" + userId, { headers: authHeader() })
            setData3(response3.data);
        };
        fetchData();
    }, []);

    return (
        <div className={styles.profile}>
            <style jsx global>{`
                * {
                    margin: 0;
                    padding: 0;
                }                
            `}</style>
            <div className={styles.top}>
                <div className={styles.avatar}>
                    <div className={styles.avatar_src}>
                        <img className={styles.avatar_src_img} src={data.avatar != null ? data.avatar : '/images/avatar.png'} width="120" height="120" alt="avatar"></img>
                    </div>

                    <p className={styles.name}>{data.profileName}</p>
                </div>

                <div className={styles.info}>
                    <div className={styles.info_top}>
                        <Link className={styles.edit} href={"/Edit_Profile"}>
                            <p>Chỉnh sửa</p>
                        </Link>
                        <p className={styles.num_post}>{num_posts.toString().length === 1 && num_posts !== 0 ? "0" + num_posts : num_posts} bài viết</p>
                        <Link className={styles.num_friends} href={"/FriendList"}>
                            <p>{num_friends.toString().length === 1 && num_friends !== 0 ? "0" + num_friends : num_friends} bạn bè</p>
                        </Link>
                    </div>
                    <p className={styles.biography}>{data.biography == null ? "Chưa có tiểu sử" : data.biography}</p>
                </div>
            </div>

            <div className={styles.center}>
                <div className={styles.center_text}>Bài viết</div>
                <div className={styles.center_border}></div>
            </div>

            <div className={styles.posts}>
                {data && data.posts && data.posts.slice().reverse().map((val) => (
                    <Post postId={val.postId} userId={data.userId} key={val.postId}></Post>
                ))}
            </div>
        </div >
    )
}

export default Profile;