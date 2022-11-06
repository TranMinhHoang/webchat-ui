import { faSearch, faUserGroup, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './LeftSide.module.scss';

import Conversation from './Conversation';

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
                    <button className={cx('nav-icon_item')}>
                        <FontAwesomeIcon icon={faUserPlus} />
                    </button>
                    <button className={cx('nav-icon_item')}>
                        <FontAwesomeIcon icon={faUserGroup} />
                    </button>
                </div>
            </div>
            <div className={cx('search-chat')}>
                <div className={cx('search-container')}>
                    <input className={cx('search-input')} type="text" placeholder="Tìm kiếm" />
                    <FontAwesomeIcon className={cx('search-icon')} icon={faSearch} />
                </div>
            </div>
            <div className={cx('chat-list')}>
                <Conversation
                    // unseen="2"
                    srcImg="https://cdn.dienthoaivui.com.vn/wp-content/uploads/2020/10/hinh-nen-iphone-12-19-scaled.jpg"
                    name="Nguyễn Thành Hưng"
                    time="12:17"
                    message="Thôi tìm đi! Hưng đi ngủ đây!chiều còn học"
                />
                <Conversation
                    // unseen="2"
                    srcImg="https://cdn.dienthoaivui.com.vn/wp-content/uploads/2020/10/hinh-nen-iphone-12-19-scaled.jpg"
                    name="Nguyễn Thành Hưng"
                    time="12:17"
                    message="Thôi tìm đi! Hưng đi ngủ đây!chiều còn học"
                />
                <Conversation
                    unseen="2"
                    srcImg="https://cdn.dienthoaivui.com.vn/wp-content/uploads/2020/10/hinh-nen-iphone-12-19-scaled.jpg"
                    name="Nguyễn Thành Hưng"
                    time="12:17"
                    message="Thôi tìm đi! Hưng đi ngủ đây!chiều còn học"
                />
                <Conversation
                    unseen="4"
                    srcImg="https://cdn.dienthoaivui.com.vn/wp-content/uploads/2020/10/hinh-nen-iphone-12-19-scaled.jpg"
                    name="Nguyễn Thành Hưng"
                    time="12:17"
                    message="Thôi tìm đi! Hưng đi ngủ đây!chiều còn học"
                />
                <Conversation
                    // unseen="2"
                    srcImg="https://cdn.dienthoaivui.com.vn/wp-content/uploads/2020/10/hinh-nen-iphone-12-19-scaled.jpg"
                    name="Nguyễn Thành Hưng"
                    time="12:17"
                    message="Thôi tìm đi! Hưng đi ngủ đây!chiều còn học"
                />
                <Conversation
                    // unseen="2"
                    srcImg="https://cdn.dienthoaivui.com.vn/wp-content/uploads/2020/10/hinh-nen-iphone-12-19-scaled.jpg"
                    name="Nguyễn Thành Hưng"
                    time="12:17"
                    message="Thôi tìm đi! Hưng đi ngủ đây!chiều còn học"
                />
                <Conversation
                    // unseen="2"
                    srcImg="https://cdn.dienthoaivui.com.vn/wp-content/uploads/2020/10/hinh-nen-iphone-12-19-scaled.jpg"
                    name="Nguyễn Thành Hưng"
                    time="12:17"
                    message="Thôi tìm đi! Hưng đi ngủ đây!chiều còn học"
                />
                <Conversation
                    // unseen="2"
                    srcImg="https://cdn.dienthoaivui.com.vn/wp-content/uploads/2020/10/hinh-nen-iphone-12-19-scaled.jpg"
                    name="Nguyễn Thành Hưng"
                    time="12:17"
                    message="Thôi tìm đi! Hưng đi ngủ đây!chiều còn học"
                />
            </div>
        </div>
    );
}

export default LeftSide;
