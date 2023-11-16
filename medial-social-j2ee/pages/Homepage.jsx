import styles from '@/styles/Homepage.module.css'
import Image from 'next/image';
import Post from "./components/Post";
import PostDetail from './components/PostDetail';

const Homepage = () => {
    return (
        <div className={styles.container}>
            <Post />
            <Post />
            {/* <PostDetail /> */}
        </div>
    );
}

export default Homepage;