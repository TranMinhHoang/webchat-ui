import classNames from 'classnames/bind';
import styles from './RightSide.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faFaceSmile, faImage, faSearch } from '@fortawesome/free-solid-svg-icons';
import BoxChat from './BoxChat';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function RightSide() {
    return (
        <div className={cx('rightside')}>
            <div className={cx('header')}>
                <div className={cx('imgtext')}>
                    <div className={cx('userimg')}>
                        <img
                            src="https://cdn.dienthoaivui.com.vn/wp-content/uploads/2020/10/hinh-nen-iphone-12-19-scaled.jpg"
                            className={cx('cover')}
                            alt="ảnh của tôi"
                        />
                    </div>
                    <h4>
                        Nguyễn Thành Hưng
                        <br />
                        <span>Online</span>
                    </h4>
                </div>
                <ul className={cx('nav-icon')}>
                    <li>
                        <FontAwesomeIcon icon={faSearch} />
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faEllipsisVertical} />
                    </li>
                </ul>
            </div>

            <BoxChat />

            <div className={cx('chatbox_input')}>
                <FontAwesomeIcon className={cx('icon')} icon={faFaceSmile} />
                <FontAwesomeIcon className={cx('icon')} icon={faImage} />
                <input type="text" placeholder="Soạn tin nhắn" />
                <img src={images.send} className={cx('icon', 'send')} alt="" />
            </div>
        </div>
    );
}

export default RightSide;
