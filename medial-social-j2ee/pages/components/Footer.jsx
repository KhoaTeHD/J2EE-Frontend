import styles from '@/styles/Footer.module.css'
import Link from 'next/link';
const Footer = () => {
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <div className={styles.item}>
                    <li className={styles.menu_item}>
                        <Link className={styles.text} href={"/"}>Giới thiệu</Link>
                    </li>
                    <li className={styles.menu_item}>
                        <Link className={styles.text} href={"/"}>Về chúng tôi</Link>
                    </li>
                    <li className={styles.menu_item}>
                        <Link className={styles.text} href={"/"}>Điều khoản</Link>
                    </li>
                    <li className={styles.menu_item}>
                        <Link className={styles.text} href={"/"}>Về bảo mật</Link>
                    </li>
                    <li className={styles.menu_item}>
                        <Link className={styles.text} href={"/"}>Vị trí</Link>
                    </li>
                    <li className={styles.menu_item}>
                        <Link className={styles.text} href={"/"}>Quyền riêng tư</Link>
                    </li>
                </div>
            </div>
            <div className={styles.bottom}>
                <p className={styles.item_bottom}>© 2023 Fakeins from Team9</p>
            </div>
        </div>
    );
}

export default Footer;