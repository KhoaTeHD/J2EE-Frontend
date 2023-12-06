import styles from '@/styles/Homepage.module.css'
import Image from 'next/image';
import Post from "./components/Post";
import PostDetail from './components/PostDetail';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import authHeader from "./api/auth-header";
import authService from './api/auth-service';

const Homepage = () => {

    var user = authService.getCurrentUser();

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("http://localhost:8080/post/recomment/" + user.id, { headers: authHeader() })
            setData(response.data);
        };
        fetchData();
    }, []);


    return (
        <div className={styles.container}>
            {
                data && (data.map((val) => (<Post postId={val.postId} userId={val.user.userId} key={val.postId}></Post>)))
            }
        </div>
    );
}

export default Homepage;