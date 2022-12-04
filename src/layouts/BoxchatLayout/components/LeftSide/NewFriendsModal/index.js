import Modal from '~/components/Modal';
import classNames from 'classnames/bind';
import styles from './NewFriendsModal.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faXmark } from '@fortawesome/free-solid-svg-icons';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function NewFriendsModal({ onClick }) {
    return (
        <>
            <Modal onClick={onClick}>
                <div className={cx('head')}>
                    <div className={cx('add_friend')}>
                        <b>Thêm bạn</b>
                        <FontAwesomeIcon className={cx('head_close')} icon={faXmark} onClick={onClick} />
                    </div>
                    <div className={cx('find_phone')}>
                        <FontAwesomeIcon className={cx('phone-icon')} icon={faPhone} />
                        <input type="text" placeholder="Số điện thoại" />
                    </div>
                </div>

                <div className={cx('form_body')}>
                    <div className={cx('search_history')}> Có thể bạn quen</div>
                    <ul className={cx('search_history_list')}>
                        <li className={cx('search_history_item')}>
                            <Image className={cx('search_history_item_avt')} src="./image/avt.jpg" />
                            <div className={cx('search_history_item_info')}>
                                <h5 className={cx('search_history_item_name')}>Nguyễn Thành Hải</h5>
                                <p className={cx('search_history_item_phone')}>Từ gợi ý kết bạn</p>
                            </div>
                            <button className={cx('search_history_item_btn')}>Kết bạn</button>
                        </li>
                        <li className={cx('search_history_item')}>
                            <Image className={cx('search_history_item_avt')} src="./image/avt.jpg" />
                            <div className={cx('search_history_item_info')}>
                                <h5 className={cx('search_history_item_name')}>Dương Đăng Việt</h5>
                                <p className={cx('search_history_item_phone')}>Từ gợi ý kết bạn</p>
                            </div>
                            <button className={cx('search_history_item_btn')}>Kết bạn</button>
                        </li>
                        <li className={cx('search_history_item')}>
                            <Image className={cx('search_history_item_avt')} src="./image/avt.jpg" />
                            <div className={cx('search_history_item_info')}>
                                <h5 className={cx('search_history_item_name')}>Trần Minh Hoàng</h5>
                                <p className={cx('search_history_item_phone')}>Từ gợi ý kết bạn</p>
                            </div>
                            <button className={cx('search_history_item_btn')}>Kết bạn</button>
                        </li>
                        <li className={cx('search_history_item')}>
                            <Image className={cx('search_history_item_avt')} src="./image/avt.jpg" />
                            <div className={cx('search_history_item_info')}>
                                <h5 className={cx('search_history_item_name')}>Nguyễn Văn Phúc</h5>
                                <p className={cx('search_history_item_phone')}>Từ gợi ý kết bạn</p>
                            </div>
                            <button className={cx('search_history_item_btn')}>Kết bạn</button>
                        </li>
                        <li className={cx('search_history_item')}>
                            <Image className={cx('search_history_item_avt')} src="./image/avt.jpg" />
                            <div className={cx('search_history_item_info')}>
                                <h5 className={cx('search_history_item_name')}>Nguyễn Thành Hưng</h5>
                                <p className={cx('search_history_item_phone')}>Từ gợi ý kết bạn</p>
                            </div>
                            <button className={cx('search_history_item_btn')}>Kết bạn</button>
                        </li>
                    </ul>
                </div>

                <div className={cx('form_footer')}>
                    <button className={cx('close')} onClick={onClick}>
                        Hủy
                    </button>
                    <button className={cx('search-btn')}>Tìm kiếm</button>
                </div>
            </Modal>
        </>
    );
}

export default NewFriendsModal;
