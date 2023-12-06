import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from '@/styles/Profile.module.css';
import Post from "./components/Post";
import authHeader from "./api/auth-header";
import authService from './api/auth-service';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
    var user = authService.getCurrentUser();

    const [data, setData1] = useState([]);
    const [num_friends, setData2] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response1 = await axios.get("http://localhost:8080/api/userProfile/id/" + user.id, { headers: authHeader() })
            setData1(response1.data);
            const response2 = await axios.get("http://localhost:8080/api/userProfile/numFriends/" + user.id, { headers: authHeader() })
            setData2(response2.data);
        };
        fetchData();
    }, []);

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
                        <img className={styles.avatar_src_img} src={data.avatar != null ? data.avatar : '/images/avatar.png'} width="120" height="120" alt="avatar"></img>
                    </div>

                    <p className={styles.name}>{data.profileName}</p>
                </div>

                <div className={styles.info}>
                    <div className={styles.info_top}>
                        <Link className={styles.edit} href={"/Edit_Profile"}>
                            <p>Chỉnh sửa</p>
                        </Link>
                        <p className={styles.num_post}>05 bài viết</p>
                        <Link className={styles.num_friends} href={"/FriendList"}>
                            <p>{num_friends} bạn bè</p>
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
                <Post />
                <Post />
            </div>
        </div >
    )
}

export default Profile;