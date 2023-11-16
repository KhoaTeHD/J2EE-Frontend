import styles from '@/styles/Register.module.css'
import Link from 'next/link'

const register = () => {

  return (
    <div className={styles.register}>
      <div className={styles.card}>
        <div className={styles.left}>
          <h1 className={styles.welcome}>Fakeins.</h1>
          <p className={styles.desc}>
            Bạn cần nhập đủ thông tin và chính xác để tham gia vào mạng xã hội của chúng tôi.
          </p>
          <span className={styles.not}>Bạn đã có tài khoản?</span>
          <Link className={styles.btnLogin} href={"/"}>Đăng nhập</Link>

        </div>
        <div className={styles.right}>
          <h1 className={styles.title}>Register</h1>
          <div className={styles.input_box}>
            <input className={styles.input} type="email" required />
            <label className={styles.text_input} htmlFor="">Email</label>
            <div className={styles.underline} ></div>
          </div>
          <div className={styles.input_box}>
            <input className={styles.input} type="password" required />
            <label className={styles.text_input} htmlFor="">Mật khẩu</label>
            <div className={styles.underline} ></div>
          </div>
          <div className={styles.input_box}>
            <input className={styles.input} type="password" required />
            <label className={styles.text_input} htmlFor="">Nhập lại mật khẩu</label>
            <div className={styles.underline} ></div>
          </div>
          <div className={styles.input_box}>
            <input className={styles.input} type="text" required />
            <label className={styles.text_input} htmlFor="">Tên người dùng</label>
            <div className={styles.underline} ></div>
          </div>
          <button className={styles.btn}>Đăng ký</button>

        </div>
      </div>
    </div>
  );
};
export default register;
