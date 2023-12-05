import { useRouter } from "next/router";
import styles from '@/styles/Notification.module.css';

const Notification = () => {
    const router = useRouter();
    const handleLogin = () => {
        router.push("/"); // Chuyển hướng người dùng đến trang đăng nhập
      };
    return (
        <div className={styles.container}>
            <p>Bạn cần đăng nhập để truy cập vào trang chủ.</p>
          <button onClick={handleLogin}>Đăng nhập</button>
        </div>
    );
}

export default Notification;