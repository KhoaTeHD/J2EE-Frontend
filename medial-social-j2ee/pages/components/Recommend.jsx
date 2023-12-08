import styles from '@/styles/Recommend.module.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import authHeader from "../api/auth-header";
import RecommendCard from './RecommendCard';
import authService from '../api/auth-service'

const Recommend = () => {
    var user = authService.getCurrentUser();

    const [data,setData] = useState([]);
    
    useEffect (()=> {
        const fetchData = async () => {
            const response = await axios.get("http://localhost:8080/api/friends/recommend/"+ user.id, { headers: authHeader() })
            setData(response.data);
        };
        fetchData();
    }, []);

    return (
        <div className={styles.container_bottom}>
                <div className={styles.container_friendlist}>
                    <div className={styles.friendlist_label}>Gợi ý</div>
                    <div className={styles.FriendList}>
                        {
                            data && (data.map((val)=>( <RecommendCard name={val.profileName} bio={val.biography} user={user.id} friend={val.userId} key={val.userId} avt={val.avatar}></RecommendCard> )))
                        }
                    </div>
                </div>
            </div>
    );
}

export default Recommend
