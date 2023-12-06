import styles from '@/styles/Recommend.module.css';
import axios from 'axios';
import Image from 'next/image'
import { useState, useEffect } from 'react';
import authHeader from '../api/auth-header';


const RecommendCard = (props) => {
    const { user, friend } = props;
    const [requested,setRequested] = useState(false);
    const [data,setData] = useState(0);
    
    useEffect (()=> {
        const fetchData = async () => {
            const response = await axios.get("http://localhost:8080/api/friends/mutualfriends/"+ user + "," + friend, { headers: authHeader() })
            setData(response.data);
        };
        fetchData();
    }, []);

    const addFriend = async () => {
        const response = await axios.post("http://localhost:8080/api/requests/add/"+ user + "/" + friend , { headers: authHeader()})
    };

    const addfriendHandler = () => {
        addFriend();
        setRequested(true);
    }

    return (
        <div className={styles.recommend_card}>
            <div className={styles.recommend_card_img}><Image src="/images/avatar.png" width="100" height="100" alt={props.name}></Image></div>
            <div className={styles.recommend_card_information}>
                <div className={styles.recommend_card_name}>{props.name}</div>
                <div className={styles.recommend_card_bio}>{props.bio}</div>
                <div className={styles.recommend_card_mutual_friends}>Có { data && (data) } Bạn chung</div>
            </div>
            <div className={styles.recommend_card_action}>
                { requested ? (<div className={styles.recommend_card_action_button}>Đã gửi lời mời kết bạn</div>) : <div className={styles.recommend_card_action_button} onClick={addfriendHandler}>Thêm bạn bè</div>}
            </div>
        </div>
    );
}

export default RecommendCard
