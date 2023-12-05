import styles from '@/styles/Login.module.css'
import Link from 'next/link'
import Image from 'next/image';
import { useState, useEffect } from 'react';
import AuthService from './../api/auth-service';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { useRouter } from 'next/router'
import { useRef } from 'react';

const required = (value) => {
    if (!value) {
        return (
            <div className={styles.error} role="alert">
                Không được để trống!
            </div>
        );
    }
};
const Login = () => {
    const router = useRouter();
    const form = useRef();
    const checkBtn = useRef();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [visible, setVisible] = useState(true);

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };
    const handleLogin = (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            AuthService.login(email, password).then(
                () => {
                    router.push('Homepage');
                },
                (error) => {
                    const resMessage = (error.response.data.message)
                    setLoading(false);
                    setMessage(resMessage);
                }
            );
        } else {
            setLoading(false);
        }
    };
    //không rollback được về lại đăng nhập khi người dùng ko bấm logout
    const [currentUser, setCurrentUser] = useState(undefined);
    useEffect(() => {
      const user = AuthService.getCurrentUser();
      if (user) { 
        setCurrentUser(user);
        router.push("Homepage");
      }
  }, []);
    return (
        <div className={styles.container}>
            <div className={styles.login}>
                <div className={styles.card}>
                    <div className={styles.left}>
                        <h1 className={styles.welcome}>Welcome to FakeIns</h1>
                        <p className={styles.desc}>
                            Hãy bắt đầu trang mạng xã hội để kết nối với bạn bè và chia sẻ những khoảng khắc thú vị của bạn với chúng tôi.
                        </p>
                        <span className={styles.not}>Bạn chưa có tài khoản?</span>
                        <Link className={styles.regis} href="/Register">Đăng ký</Link>.
                    </div>
                    <div className={styles.right}>
                        <div className={styles.title}>Đăng nhập</div>
                        <Form onSubmit={handleLogin} ref={form} className={styles.form}>
                            <div className={styles.input_box}>
                                <Input className={styles.form_input} type="text"
                                    name="email"
                                    value={email}
                                    onChange={onChangeEmail}
                                    validations={[required]}
                                />
                                <label className={styles.text_input} htmlFor="">Tài khoản</label>
                                {/* <div className={styles.underline} ></div> */}
                            </div>
                            <div className={styles.input_box}>
                                <Input className={styles.form_input} type={
                                    visible ? "password" : "text"
                                }
                                    name="password"
                                    value={password}
                                    onChange={onChangePassword}
                                    validations={[required]}
                                />
                                <label className={styles.text_input} htmlFor="">Mật khẩu</label>
                                <div className={styles.eyes} onClick={() => setVisible(!visible)}>
                                    {visible ? <Image className={styles.card_img} src="/icons/icons8-hide-48.png" alt="" width="30" height="30" />
                                        : <Image className={styles.card_img} src="/icons/icons8-show-48.png" alt="" width="30" height="30" />}
                                </div>                            </div>
                            <button className={styles.btn} disabled={loading}>
                                {loading && (
                                    <i class="fa fa-circle-o-notch fa-spin"></i>
                                )}
                                <span>Login</span>
                            </button>
                            {message && (
                                <div className={styles.message}>
                                    <div className={styles.alert} role="alert">
                                        {message}
                                    </div>
                                </div>
                            )}
                            <CheckButton style={{ display: "none" }} ref={checkBtn} />
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login
