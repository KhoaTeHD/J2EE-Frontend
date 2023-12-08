import styles from '@/styles/Recommend.module.css';
import axios from 'axios';
import Image from 'next/image'
import { useState, useEffect } from 'react';
import authHeader from '../api/auth-header';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RecommendCard = (props) => {
    const notify = (message) => toast.success(message, { autoClose: 1500 });
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
        notify("Gửi lời mời kết bạn thành công!");
    }

    return (
        <div className={styles.recommend_card}>
            <ToastContainer />
            <div className={styles.recommend_card_img}><Link className={styles.link} href={`/profile/${friend}`}><Image src={props.avt == null ? "/images/avatar.png" : props.avt} width="100" height="100" alt={props.name}></Image></Link></div>
            <div className={styles.recommend_card_information}>
                <Link className={styles.link} href={`/profile/${friend}`}>
                    <div className={styles.recommend_card_name}>{props.name}</div>
                </Link>
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
