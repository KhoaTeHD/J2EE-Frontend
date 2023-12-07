import React, { useEffect } from "react";
import styles from '@/styles/Recommend.module.css';
import Friends from "./components/Friends";
import Recommend from "./components/Recommend";
import { useState } from "react";
import FrRequest from "./components/FrRequest";
import Pusher from "pusher-js";
import AuthService from "./api/auth-service";


export default function FriendList(){

    const [content,setContent] = useState("friendlist");
    const [notify,setNotify] = useState();

    const changeContent = (content) => {
        setContent(content);
    }
    useEffect(()=>{
        const user = AuthService.getCurrentUser();
        
        var pusher = new Pusher('7c9f018d64bec3a78677', {
            cluster: 'ap3'
        });
        
        var channel = pusher.subscribe('my-channel');
        channel.bind('my-event', function(data) {
            if(user.id == data){
                setNotify(true);
            }
        });
        
        return () => {
            pusher.unsubscribe('my-channel');
        };
    });
    
    const onClickRequest = () => { if(notify) {setNotify(false)}}

    return(
        <div className={styles.container}>
            <div className={styles.container_top}>
                <div className={styles.boxes}>
                    <div className={styles.recommend_box} onClick={()=>changeContent("recommend")}>Gợi ý</div>
                    <div className={styles.friendlist_box} onClick={()=>changeContent("friendlist")}>Bạn bè</div>
                    <div className={styles.friendrequest_box} onClick={()=>{changeContent("friendrequest"); onClickRequest()}}>
                        {notify == true && <span className={styles.dot}></span>}
                        Lời mời kết bạn
                    </div>
                </div>
            </div>
            {content == "friendlist" && <Friends/>}
            {content == "recommend" && <Recommend/>}
            {content == "friendrequest" && <FrRequest/>}
        </div>
    )
}