import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Avatar from 'react-avatar';
import Modal from '../Modal';
import classNames from 'classnames/bind';
import styles from './ProfileModal.module.scss';

const cx = classNames.bind(styles);

function ProfileModal({ onClick, currentUser }) {
    return (
        // <div class="modal_myinfo">
        //     <div class="myinfo_form">
        <Modal onClick={onClick}>
            <div className={cx('header_myinfo')}>
                <div className={cx('myinfo_text')}>
                    <span>Thông tin tài khoản</span>
                </div>
                <FontAwesomeIcon
                    className={cx('myinfo_close')}
                    icon={faXmark}
                    onClick={onClick}
                />
            </div>
            <div className={cx('body_myinfo')}>
                <div className={cx('img_cover')}>
                    <Avatar size="100%" />
                </div>
                <div className={cx('img_avtinfo')}>
                    <Avatar name={currentUser.fullname} size="70px" />
                </div>
                <div className={cx('info')}>
                    <div className={cx('name')}>
                        <span>
                            <b>{currentUser.fullname}</b>
                        </span>
                    </div>
                    <div className={cx('text_iteminfo')}>
                        <span>
                            <b>Thông tin cá nhân</b>
                        </span>
                    </div>
                    <div className={cx('iteminfo')}>
                        <div className={cx('left_myinfo')}>
                            <li>Điện thoại</li>
                            <li>Email</li>
                            <li>Giới tính</li>
                            <li>Ngày sinh</li>
                        </div>
                        <div className={cx('right_myinfo')}>
                            <li>{currentUser?.phone}</li>
                            <li>{currentUser?.email}</li>
                            <li>{currentUser?.gender}</li>
                            <li>{currentUser?.birth}</li>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('footer_myinfo')}>
                <div className={cx('footer_myinfo1')}>
                    <button className={cx('update_info')}>
                        <span className={cx('text_update')}>
                            Cập nhật thông tin
                        </span>
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default ProfileModal;
