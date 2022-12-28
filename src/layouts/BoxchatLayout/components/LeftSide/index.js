import {
    faSearch,
    faUserGroup,
    faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SockJsClient from 'react-stomp';

import styles from './LeftSide.module.scss';
import NewFriendsModal from './NewFriendsModal';
import { getAllUsers, logout } from '~/redux/apiRequest';
import Avatar from 'react-avatar';

const cx = classNames.bind(styles);

function LeftSide({ children, onClick: handleOpenConversation }) {
    const [isMenu, setIsMenu] = useState(false);
    const [isNewFriendsModal, setIsNewFriendsModal] = useState(false);

    const [state, setState] = useState({
        messages: JSON.parse(localStorage.getItem('messages') || '{}'),
        from: '',
        to: '',
        typedMessage: '',
    });

    const user = useSelector((state) => state.auth.login?.currentUser);
    const userList = useSelector((state) => state.user.users?.allUsers);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleShow = () => {
        isMenu === false ? setIsMenu(true) : setIsMenu(false);
    };

    const handleHideMenu = () => {
        setIsMenu(false);
    };

    const hanldeShowNewFriendsModal = () => {
        setIsNewFriendsModal(!isNewFriendsModal);
    };

    const handleLogOut = () => {
        logout(user, dispatch);
    };

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
        if (user?.accessToken) {
            getAllUsers(user?.accessToken, dispatch);
        }
        // userList.forEach((item) => {
        //     setState((prev) => ({
        //         ...prev,
        //         messages: {
        //             ...state.messages,
        //             [item.id]: [],
        //         },
        //     }));
        //     console.log(item.id);
        // localStorage.setItem(
        //     'messages',
        //     JSON.stringify({
        //         ...state.messages,
        //         [item.id]: [],
        //     }),
        // );
        // });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    console.log(state);
    return (
        <div className={cx('leftside')}>
            <div className={cx('header')}>
                {/* <SockJsClient
                    url="http://localhost:8080/websocket-chat/"
                    topics={['/topic/user']}
                    onConnect={() => {
                        console.log('connected');
                    }}
                    onDisconnect={() => {
                        console.log('Disconnected');
                    }}
                    onMessage={(msg) => {}}
                /> */}
                <Tippy
                    interactive
                    visible={isMenu}
                    placement="right-start"
                    render={(attrs) => (
                        <div className={cx('menu')} tabIndex="-1" {...attrs}>
                            <h3 className={cx('user-name')}>
                                {user?.fullname}
                            </h3>

                            <Link
                                to="/profile"
                                className={cx(
                                    'menu-item',
                                    'separate',
                                    'item-name',
                                )}
                            >
                                Hồ sơ cá nhân
                            </Link>

                            <Link
                                to="/login"
                                className={cx(
                                    'menu-item',
                                    'separate',
                                    'item-name',
                                )}
                                onClick={handleLogOut}
                            >
                                Đăng xuất
                            </Link>
                        </div>
                    )}
                    onClickOutside={handleHideMenu}
                >
                    <div className={cx('user-img')} onClick={handleShow}>
                        <Avatar
                            className={cx('cover')}
                            name={user?.fullname}
                            size="40"
                        />
                    </div>
                </Tippy>
                <div className={cx('nav-icon')}>
                    <button
                        className={cx('nav-icon_item')}
                        onClick={hanldeShowNewFriendsModal}
                    >
                        <FontAwesomeIcon icon={faUserPlus} />
                    </button>

                    <button className={cx('nav-icon_item')}>
                        <FontAwesomeIcon icon={faUserGroup} />
                    </button>
                </div>
            </div>
            <div className={cx('search-chat')}>
                <div className={cx('search-container')}>
                    <input
                        className={cx('search-input')}
                        type="text"
                        placeholder="Tìm kiếm"
                    />
                    <FontAwesomeIcon
                        className={cx('search-icon')}
                        icon={faSearch}
                    />
                </div>
            </div>
            <div className={cx('chat-list')}>
                {userList?.map((item) => {
                    if (item.id === user?.id) {
                        return <Fragment key={item.id} />;
                    } else {
                        return (
                            <div
                                key={item.id}
                                className={cx(
                                    'conversation',
                                    item.unseen && 'unseen',
                                )}
                                onClick={() => handleOpenConversation(item)}
                            >
                                <div className={cx('imgbx')}>
                                    <Avatar
                                        className={cx('cover')}
                                        name={item.fullname}
                                        size="40"
                                    />
                                </div>
                                <div className={cx('details')}>
                                    <div className={cx('listhead')}>
                                        <h4>{item.fullname}</h4>
                                        <p className={cx('time')}>
                                            {item.time}
                                        </p>
                                    </div>
                                    <div className={cx('message')}>
                                        <p>{item.message}</p>
                                        <b>{item.unseen}</b>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                })}
            </div>

            {isNewFriendsModal && (
                <NewFriendsModal onClick={hanldeShowNewFriendsModal} />
            )}
        </div>
    );
}

export default LeftSide;
