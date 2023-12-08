import styles from '@/styles/Recommend.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import authHeader from "../api/auth-header";
import FriendCard from './FriendCard';
import authService from '../api/auth-service';

const Friends = () => {
    var user = authService.getCurrentUser();

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("http://localhost:8080/api/friends/get/" + user.id, { headers: authHeader() })
            setData(response.data);
        };
        fetchData();
        //console.log(data);
    }, []);

    //console.log(data);

    return (
        <div className={styles.container_bottom}>
            <div className={styles.container_friendlist}>
                <div className={styles.friendlist_label}>Bạn bè</div>
                <div className={styles.FriendList}>
                    {
                        data && (data.map((val) => (<FriendCard name={val.profileName} bio={val.biography} user={user.id} friend={val.userId} key={val.userId} avt={val.avatar}></FriendCard>)))
                    }
                </div>
            </div>
        </div>
    );
}

export default Friends
