import styles from '@/styles/Recommend.module.css';
import axios from 'axios';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import authHeader from "../api/auth-header";
import RecommendCard from './RecommendCard';
import authService from '../api/auth-service'

const Recommend = () => {
    var user = authService.getCurrentUser();

    const [data,setData] = useState();
    
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
                            data && (data.map((val)=>( <RecommendCard name={val.profileName} bio={val.biography} user={user.id} friend={val.userId} key={val.userId}></RecommendCard> )))
                        }
                        {/* <div className={styles.recommend_card}>
                            <div className={styles.recommend_card_img}><Image src="/images/avatar.png" width="100" height="100"></Image></div>
                            <div className={styles.recommend_card_information}>
                                <div className={styles.recommend_card_name}>Võ Quang Đăng Khoa</div>
                                <div className={styles.recommend_card_bio}>If the path to what you want seems too easy, Then you're on the wrong path</div>
                                <div className={styles.recommend_card_mutual_friends}>Có 8 Bạn chung</div>
                            </div>
                            <div className={styles.recommend_card_action}>
                                <div className={styles.recommend_card_action_button}>Thêm bạn bè</div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
    );
}

export default Recommend
