import styles from '@/styles/Recommend.module.css';
import axios from 'axios';
import Image from 'next/image'
import { useState, useEffect } from 'react';
import authHeader from '../api/auth-header';


const FriendCard = (props) => {
    const { user, friend } = props;

    const [data, setData] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("http://localhost:8080/api/friends/mutualfriends/" + user + "," + friend, { headers: authHeader() })
            setData(response.data);
        };
        fetchData();
    }, []);

    const acceptRequest = async () => {
        const response = await axios.post("http://localhost:8080/api/requests/accept/"+ user + "/" + friend , { headers: authHeader()})
    };

    const denyRequest = async () => {
        const response = await axios.delete("http://localhost:8080/api/requests/deny/"+ user + "/" + friend , { headers: authHeader()})
    };

    const acceptHandler = (event) => {
        acceptRequest();
        const card = event.target.parentNode.parentNode;
        card.remove();
    }

    const denyHandler = (event) => {
        denyRequest();
        const card = event.target.parentNode.parentNode;
        card.remove();
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
                <div className={styles.recommend_card_action_button} onClick={acceptHandler}>Chấp nhận</div>
                <div className={`${styles.recommend_card_action_button} ${styles.warning}`} onClick={denyHandler}>Từ chối</div>
                </div>
        </div>
    );
}

export default FriendCard
