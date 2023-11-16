import style from '@/styles/Search.module.css';

export default function Search() {
    return (
        <>
            <div className={`${style.search_area} none`} id='searchBox'>
                <h1>Search</h1>
                <input type="text" name="searchIO" placeholder='Muốn tìm...' />
                <button>Tìm kiếm</button>
                <hr />
                <div className={style.user}>
                    <img src="/images/avatar.png" alt="" />
                    <div>
                        <p className={style.name}>Nguyễn Đăng Khoa</p>
                        <p className={style.desc}>Rất thích chơi gem</p>
                    </div>

                </div>
                
            </div>
        </>
    )
}