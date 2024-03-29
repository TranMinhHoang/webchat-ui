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

import styles from './LeftSide.module.scss';
import NewFriendsModal from '~/components/NewFriendsModal';
import { getAllUsers, logout } from '~/redux/apiRequest';
import Avatar from 'react-avatar';
import ProfileModal from '~/components/ProfileModal';

const cx = classNames.bind(styles);

function LeftSide({
  onClick: handleOpenConversation,
  state,
  listUserOnline,
  activeLink,
}) {
  const [isMenu, setIsMenu] = useState(false);
  const [isNewFriendsModal, setIsNewFriendsModal] = useState(false);
  const [isProfileModal, setIsProfileModal] = useState(false);
  const [lastMessage, setLastMessage] = useState({});

  const currentUser = useSelector((state) => state.auth.login?.currentUser);
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

  const hanldeShowProfileModal = () => {
    setIsMenu(!isMenu);
    setIsProfileModal(!isProfileModal);
  };

  const handleLogOut = () => {
    logout(currentUser, dispatch);
  };

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
    if (currentUser?.accessToken) {
      getAllUsers(currentUser?.accessToken, dispatch);
    }
  }, []);

  useEffect(() => {
    userList?.map((user) => {
      state.messages[user.id]?.map((msg) => {
        if (
          (Number(msg.from) === currentUser?.id &&
            Number(msg.to) === user.id) ||
          (Number(msg.from) === user.id && Number(msg.to) === currentUser?.id)
        ) {
          setLastMessage((prev) => ({
            ...prev,
            [user?.id]: msg,
          }));
        }
      });
    });
  }, [state]);

  return (
    <div className={cx('leftside')}>
      <div className={cx('header')}>
        <div>
          <Tippy
            interactive
            visible={isMenu}
            placement="right-start"
            render={(attrs) => (
              <div className={cx('menu')} tabIndex="-1" {...attrs}>
                <h3 className={cx('user-name')}>{currentUser?.fullname}</h3>

                <a
                  className={cx('menu-item', 'separate', 'item-name')}
                  onClick={hanldeShowProfileModal}
                >
                  Hồ sơ cá nhân
                </a>

                <a className={cx('menu-item', 'item-name')}>Đổi mật khẩu</a>

                <Link
                  to="/login"
                  className={cx('menu-item', 'separate', 'item-name')}
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
                name={currentUser?.fullname}
                size="40"
              />
            </div>
          </Tippy>
        </div>
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
          <FontAwesomeIcon className={cx('search-icon')} icon={faSearch} />
        </div>
      </div>
      <div className={cx('chat-list')}>
        {/* online */}
        <div className={cx('title')}>
          <p className={cx('text')}>Online</p>
        </div>
        {userList?.map((user) => {
          if (user.id === currentUser?.id) {
            return <Fragment key={user.id} />;
          } else if (listUserOnline[user.id]?.status) {
            return (
              <div
                key={user.id}
                className={cx(
                  'conversation',
                  activeLink?.activeLink === user.id ? 'active' : null,
                  user.unseen && 'unseen',
                )}
                onClick={() => handleOpenConversation(user)}
              >
                <div className={cx('imgbx')}>
                  <Avatar
                    className={cx('cover')}
                    name={user.fullname}
                    size="40"
                  />
                </div>
                <div className={cx('status', 'online')}></div>
                <div className={cx('details')}>
                  <div className={cx('listhead')}>
                    <h4>{user.fullname}</h4>

                    {lastMessage[user.id]?.time.slice(-5)}
                  </div>
                  <div className={cx('message')}>
                    {lastMessage[user.id]?.message !== '' &&
                      lastMessage[user.id]?.images?.length === 0 && (
                        <p>{lastMessage[user.id]?.message}</p>
                      )}
                    {lastMessage[user.id]?.message === '' &&
                      lastMessage[user.id]?.images.length > 0 && <p>[Ảnh]</p>}
                    {lastMessage[user.id]?.message !== '' &&
                      lastMessage[user.id]?.images?.length > 0 && <p>[Ảnh]</p>}
                  </div>
                </div>
              </div>
            );
          }
        })}

        {/* offline */}
        <div className={cx('title')}>
          <p className={cx('text')}>Offline</p>
        </div>
        {userList?.map((user) => {
          if (user.id === currentUser?.id) {
            return <Fragment key={user.id} />;
          } else if (!listUserOnline[user.id]?.status) {
            return (
              <div
                key={user.id}
                className={cx(
                  'conversation',
                  activeLink?.activeLink === user.id ? 'active' : null,
                  user.unseen && 'unseen',
                )}
                onClick={() => handleOpenConversation(user)}
              >
                <div className={cx('imgbx')}>
                  <Avatar
                    className={cx('cover')}
                    name={user.fullname}
                    size="40"
                  />
                </div>
                <div className={cx('status', 'offline')}></div>
                <div className={cx('details')}>
                  <div className={cx('listhead')}>
                    <h4>{user.fullname}</h4>

                    {lastMessage[user.id]?.time.slice(-5)}
                  </div>
                  <div className={cx('message')}>
                    {lastMessage[user.id]?.message !== '' &&
                      lastMessage[user.id]?.images?.length === 0 && (
                        <p>{lastMessage[user.id]?.message}</p>
                      )}
                    {lastMessage[user.id]?.message === '' &&
                      lastMessage[user.id]?.images.length > 0 && <p>[Ảnh]</p>}
                    {lastMessage[user.id]?.message !== '' &&
                      lastMessage[user.id]?.images?.length > 0 && <p>[Ảnh]</p>}
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
      {isProfileModal && (
        <ProfileModal
          onClick={hanldeShowProfileModal}
          currentUser={currentUser}
        />
      )}
    </div>
  );
}

export default LeftSide;
