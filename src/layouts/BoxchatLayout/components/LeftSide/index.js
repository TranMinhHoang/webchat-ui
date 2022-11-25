import { faSearch, faUserGroup, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';

import styles from './LeftSide.module.scss';
import Conversation from './Conversation';
import Image from '~/components/Image';
import { useState } from 'react';

const cx = classNames.bind(styles);

function LeftSide({ children }) {
    const [visible, setVisible] = useState(false);

    return (
        <div className={cx('leftside')}>
            <div className={cx('header')}>
                <Tippy
                    interactive
                    visible={visible}
                    // delay={[0, 700]}
                    placement="right-start"
                    render={(attrs) => (
                        <div className={cx('menu')} tabIndex="-1" {...attrs}>
                            <div className={cx('menu-item')}>
                                <p className={cx('item-name')}>Nguyễn Văn A</p>
                            </div>

                            <div className={cx('menu-item', 'separate')}>
                                <p className={cx('item-name')}>Đăng xuất</p>
                            </div>
                        </div>
                    )}
                >
                    <div
                        className={cx('user-img')}
                        onMouseOver={() => setVisible(true)}
                        onMouseOut={() => setVisible(false)}
                    >
                        <Image
                            className={cx('cover')}
                            src="https://pdp.edu.vn/wp-content/uploads/2021/01/hinh-nen-4k-tuyet-dep-cho-may-tinh.jpg"
                            alt=""
                        />
                    </div>
                </Tippy>
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
                <Conversation />
                <Conversation />
                <Conversation />
                <Conversation />
                <Conversation />
                <Conversation />
                <Conversation />
                <Conversation />
                <Conversation />
                <Conversation />
            </div>
        </div>
    );
}

export default LeftSide;
