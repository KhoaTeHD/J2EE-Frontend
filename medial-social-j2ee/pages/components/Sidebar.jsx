import styles from '@/styles/Sidebar.module.css'
import Link from "next/link";
import Image from 'next/image';
import Head from 'next/head';
import ndkStyle from '@/styles/logo.module.css';
import React, { useState, useEffect } from 'react';

const Sidebar = () => {

    function changeSidebar() {
        let status = 'show';
        document.getElementById('searchBox').classList.toggle('none');
        let checkExist = document.getElementById('searchBox').classList.contains('none');
        status = checkExist ? 'show' : 'hide';
        document.getElementById('sidebar').setAttribute('animation', status);
        if (status == 'hide') document.getElementById('logo').setAttribute('src', '/icons/SmallLogo.png');
        else document.getElementById('logo').setAttribute('src', '/icons/Fakeins.png');
    }

    const [showCreatePost, setShowCreatePost] = useState(false);

    const handleCreatePostClose = () => {
        setShowCreatePost(false);
        // Redirect to home page or perform necessary actions here
    };


    return (
        <div className={styles.container} id='sidebar' animation="show">
            <Head>
                <link rel="stylesheet" href="/css/animation/SidebarAnimation.css" />
            </Head>
            <div className={styles.top}>
                <Link className='bigLogo' href={"/home"}>
                    {/* <Image src="/icons/Fakeins.png" alt="" width="80" height="80" /> */}
                    <img src="/icons/Fakeins.png" alt="ảnh logo" id='logo' />
                </Link>
            </div>
            <div className={styles.center}>
                <ul className={styles.list}>
                    <Link className={styles.list_item} href={"/Homepage"}>
                        <Image className={styles.icon} src="/icons/icons8-home-64.png" alt="home" width="40" height="40" />
                        <p className={styles.text}>Trang chủ</p>
                    </Link>
                    <button onClick={changeSidebar} className={styles.button} >
                        <Image className={styles.icon} src="/icons/icons8-search-64.png" alt="sear" width="40" height="40" />
                        <p className={styles.text} id='search' >Tìm kiếm</p>
                    </button>
                    {/* <button onClick={setShowCreatePost(true)} className={styles.button}>
                        <Image className={styles.icon} src="/icons/icons8-add-64.png" alt="create" width="40" height="40" />
                        <p className={styles.text}>Tạo bài viết</p>
                        {showCreatePost && (
                            <>
                                <div className={styles.overlay} />
                                <CreatePost/>
                            </>
                        )}
                    </button> */}
                    <Link className={styles.list_item} href={"/CreatePost"}>
                        <Image className={styles.icon} src="/icons/icons8-add-64.png" alt="create" width="40" height="40" />
                        <p className={styles.text}>Tạo bài viết</p>
                    </Link>
                    <Link className={styles.list_item} href={"/FriendList"}>
                        <Image className={styles.icon} src="/icons/icons8-friend-64.png" alt="friend" width="40" height="40" />
                        <p className={styles.text}>Bạn bè</p>
                    </Link>
                    <Link className={styles.list_item} href={"/home"}>
                        <Image className={styles.icon} src="/icons/icons8-message-64.png" alt="mess" width="40" height="40" />
                        <p className={styles.text}>Tin nhắn</p>
                    </Link>
                    <Link className={styles.list_item} href={"/Profile"}>
                        <Image className={styles.icon} src="/icons/icons8-user-64.png" alt="profile" width="40" height="40" />
                        <p className={styles.text}>Trang cá nhân</p>
                    </Link>
                    {/* <li className={styles.list_item}>
                    <Image className={styles.icon} src="" alt="" width="50" height="50" />
                        <span className={styles.text_item}>Market</span>
                    </li>
                    <li className={styles.list_item}>
                    <Image className={styles.icon} src="" alt="" width="50" height="50" />
                        <span className={styles.text_item}>Resources</span>
                    </li> */}
                </ul>
            </div>
            <div className={styles.bottom}>
                <ul className={styles.list}>
                    <Link className={styles.list_item} href={"/"}>
                        <Image className={styles.icon} src="/icons/icons8-logout-64.png" alt="" width="40" height="40" />
                        <p className={styles.text}>Đăng xuất</p>
                    </Link>
                </ul>
            </div>

        </div>
    );
}

export default Sidebar;