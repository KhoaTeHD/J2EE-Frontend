import React from "react";
import styles from '@/styles/Recommend.module.css';
import Friends from "./components/Friends";
import Recommend from "./components/Recommend";
import { useState } from "react";
import FrRequest from "./components/FrRequest";

export default function FriendList(){

    const [content,setContent] = useState("friendlist");

    const changeContent = (content) => {
        setContent(content);
    }

    return(
        <div className={styles.container}>
            <div className={styles.container_top}>
                <div className={styles.boxes}>
                    <div className={styles.recommend_box} onClick={()=>changeContent("recommend")}>Gợi ý</div>
                    <div className={styles.friendlist_box} onClick={()=>changeContent("friendlist")}>Bạn bè</div>
                    <div className={styles.friendrequest_box} onClick={()=>changeContent("friendrequest")}>Lời mời kết bạn</div>
                </div>
            </div>
            {content == "friendlist" && <Friends/>}
            {content == "recommend" && <Recommend/>}
            {content == "friendrequest" && <FrRequest/>}
        </div>
    )
}