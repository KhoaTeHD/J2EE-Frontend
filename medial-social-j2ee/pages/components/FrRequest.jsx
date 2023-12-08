import styles from '@/styles/Recommend.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import authHeader from "../api/auth-header";
import FrRequestCard from './FrRequestCard';
import authService from '../api/auth-service'

const FrRequest = () => {
    var user = authService.getCurrentUser();

    const [data,setData] = useState([]);
    
    useEffect (()=> {
        const fetchData = async () => {
            const response = await axios.get("http://localhost:8080/api/requests/get/"+ user.id, { headers: authHeader() })
            setData(response.data);
        };
        fetchData();
    }, []);

    return (
        <div className={styles.container_bottom}>
                <div className={styles.container_friendlist}>
                    <div className={styles.friendlist_label}>{data.length} lời mời kết bạn</div>
                    <div className={styles.FriendList}>
                        {
                            data && (data.map((val)=>( <FrRequestCard name={val.sender.profileName} bio={val.description} user={user.id} friend={val.sender.userId} key={val.sender.userId} avt={val.avatar}></FrRequestCard> )))
                        }
                        
                    </div>
                </div>
            </div>
    );
}

export default FrRequest
