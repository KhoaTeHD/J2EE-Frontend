import style from '@/styles/Search.module.css';
import axios from 'axios';
import authHeader from "../api/auth-header";
import authService from '../api/auth-service'
import { useState,useRef } from 'react';
import Link from 'next/link';

export default function Search() {
    const [data, setdata] = useState(undefined);
    const inputRef = useRef(null);
    const demoData = {
        avatar : "/images/avatar.png",
        biography : "không có mô tả bản thân",
    }
    async function searchInfoUser() {
        const username = inputRef.current.value;
        console.log(username);
        const response = await axios.get("http://localhost:8080/api/users/search?q="+username,{ headers: authHeader() })
        setdata(response.data);
        console.log(response.data);
    }
    return (
        <>
            <div className={`${style.search_area} none`} id='searchBox'>
                <h1>Search</h1>
                <input type="text" name="searchIO" placeholder='Muốn tìm...' ref={inputRef} />
                <button onClick={searchInfoUser}>Tìm kiếm</button>
                <hr />
                { data != undefined &&  data.map(val=>(
                    <Link className={style.link} href={`/profile/${val.userId}`}>
                        <div className={style.user} key={val.userId}>
                            <img src={val.avatar==null ? demoData.avatar : val.avatar} alt="" />
                            <div>
                                <p className={style.name}>{val.profileName}</p>
                                <p className={style.desc}>{val.biography == null ? demoData.biography : val.biography}</p>
                            </div>

                        </div>
                    </Link>
                ))}
                
            </div>
        </>
    )
}