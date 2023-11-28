import styles from '@/styles/Recommend.module.css';
import axios from 'axios';
import Image from 'next/image'
import { useState, useEffect } from 'react';
import authHeader from '../api/auth-header';


const RecommendCard = (props) => {
    const { user, friend } = props;

    const [data,setData] = useState(0);
    
    useEffect (()=> {
        const fetchData = async () => {
            const response = await axios.get("http://localhost:8080/api/friends/mutualfriends/"+ user + "," + friend, { headers: authHeader() })
            setData(response.data);
        };
        fetchData();
    }, []);

    return (
        <div className={styles.recommend_card}>
            <div className={styles.recommend_card_img}><Image src="/images/avatar.png" width="100" height="100" alt={props.name}></Image></div>
            <div className={styles.recommend_card_information}>
                <div className={styles.recommend_card_name}>{props.name}</div>
                <div className={styles.recommend_card_bio}>{props.bio}</div>
                <div className={styles.recommend_card_mutual_friends}>Có { data && (data) } Bạn chung</div>
            </div>
            <div className={styles.recommend_card_action}>
                <div className={styles.recommend_card_action_button}>Thêm bạn bè</div>
            </div>
        </div>
    );
}

export default RecommendCard
