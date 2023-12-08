import styles from '@/styles/Recommend.module.css';
import axios from 'axios';
import Image from 'next/image'
import { useState, useEffect } from 'react';
import authHeader from '../api/auth-header';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FriendCard = (props) => {
    const notify = (message) => toast.success(message, { autoClose: 1500 });
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
        notify("Chấp nhận kết bạn thành công!");
        const card = event.target.parentNode.parentNode;
        card.remove();
    }

    const denyHandler = (event) => {
        denyRequest();
        notify("Từ chối kết bạn thành công!");
        const card = event.target.parentNode.parentNode;
        card.remove();
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
                <div className={styles.recommend_card_action_button} onClick={acceptHandler}>Chấp nhận</div>
                <div className={`${styles.recommend_card_action_button} ${styles.warning}`} onClick={denyHandler}>Từ chối</div>
                </div>
        </div>
    );
}

export default FriendCard
