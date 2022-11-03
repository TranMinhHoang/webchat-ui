import { faSearch, faUserGroup, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './LeftSide.module.scss';

const cx = classNames.bind(styles);

function LeftSide({ children }) {
    return (
        <div className={cx('leftside')}>
            <div className={cx('header')}>
                <div className={cx('user-img')}>
                    <img
                        className={cx('cover')}
                        src="https://pdp.edu.vn/wp-content/uploads/2021/01/hinh-nen-4k-tuyet-dep-cho-may-tinh.jpg"
                        alt=""
                    />
                </div>
                <div className={cx('nav-icon')}>
                    <FontAwesomeIcon className={cx('nav-icon_item')} icon={faUserPlus} />
                    <FontAwesomeIcon className={cx('nav-icon_item')} icon={faUserGroup} />
                </div>
            </div>
            <div className={cx('search-chat')}>
                <div className={cx('search-container')}>
                    <input className={cx('search-input')} type="text" placeholder="Tìm kiếm" />
                    <FontAwesomeIcon className={cx('search-icon')} icon={faSearch} />
                </div>
            </div>
        </div>
    );
}

export default LeftSide;
