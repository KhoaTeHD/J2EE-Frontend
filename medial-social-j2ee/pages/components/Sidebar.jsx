import styles from '@/styles/Sidebar.module.css'
import Link from "next/link";
import Image from 'next/image';
import Head from 'next/head';
import AuthService from './../api/auth-service';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Notification from './Notification';
import Pusher from 'pusher-js';

function changeSidebar() {
    let status = 'show';
    document.getElementById('searchBox').classList.toggle('none');
    let checkExist = document.getElementById('searchBox').classList.contains('none');
    status = checkExist ? 'show' : 'hide';
    document.getElementById('sidebar').setAttribute('animation', status);
}

const Sidebar = () => {
    const [currentUser, setCurrentUser] = useState(undefined);
    const [notify, setNotify] = useState();
    const router = useRouter();
    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (!user) { //kiểm tra nó chưa đăng nhập mà nó đòi vô url khác nè
            window.alert('Để tham gia vào FakeIns vui lòng đăng nhập!');
            // Notification.show();
            router.push("/"); // Chuyển hướng về trang đăng nhập
        }
        else {
            setCurrentUser(user);
        }

        var pusher = new Pusher('7c9f018d64bec3a78677', {
            cluster: 'ap3'
        });

        var channel = pusher.subscribe('my-channel');
        channel.bind('my-event', function (data) {
            if (user.id == data) {
                setNotify(true);
            }

        });

        return () => {
            pusher.unsubscribe('my-channel');
        };

    }, [router]);

    const onClickFriends = () => { if (notify) { setNotify(false) } }

    const logOut = () => {
        AuthService.logout();
        router.push("/");
    };

    return (
        <div className={styles.container} id='sidebar' animation="show">
            <Head>
                <link rel="stylesheet" href="/css/animation/SidebarAnimation.css" />
            </Head>
            <div className={styles.top}>
                <Link className={styles.logo} href={"/home"}>
                    <Image src="/icons/Fakeins.png" alt="" width="120" height="36" />
                </Link>
            </div>
            <div className={styles.center}>
                <ul className={styles.list}>
                    <Link className={styles.list_item} href={"/Homepage"}>
                        <Image className={styles.icon} src="/icons/icons8-home-64.png" alt="" width="40" height="40" />
                        <p className={styles.text}>Trang chủ</p>
                    </Link>
                    <button onClick={changeSidebar} className={styles.button} >
                        <Image className={styles.icon} src="/icons/icons8-search-64.png" alt="" width="40" height="40" />
                        <p className={styles.text} id='search' >Tìm kiếm</p>
                    </button>
                    <Link className={styles.list_item} href={"/CreatePost"}>
                        <Image className={styles.icon} src="/icons/icons8-add-64.png" alt="" width="40" height="40" />
                        <p className={styles.text}>Tạo bài viết</p>
                    </Link>
                    <Link className={`${styles.list_item} ${styles.notification}`} href={"/FriendList"} onClick={onClickFriends}>
                        {notify == true && <span className={styles.dot}></span>}
                        <Image className={styles.icon} src="/icons/icons8-friend-64.png" alt="" width="40" height="40" />
                        <p className={styles.text}>Bạn bè</p>
                    </Link>
                    <Link className={styles.list_item} href={"/Chatbox"}>
                        <Image className={styles.icon} src="/icons/icons8-message-64.png" alt="" width="40" height="40" />
                        <p className={styles.text}>Tin nhắn</p>
                    </Link>
                    {currentUser && (<Link className={styles.list_item} href={"/Profile"}>
                        <Image className={styles.icon} src="/icons/icons8-user-64.png" alt="" width="40" height="40" />
                        <p className={styles.text}> {currentUser.profileName}</p>
                    </Link>)}
                </ul>
            </div>

            <div className={styles.bottom}>
                <ul className={styles.list}>
                    <button className={styles.logout} onClick={logOut}>
                        <Image className={styles.icon} src="/icons/icons8-logout-64.png" alt="" width="40" height="40" />
                        <p className={styles.text_logout}>Đăng xuất</p>
                    </button>
                </ul>

            </div>

        </div>
    );
}

export default Sidebar;