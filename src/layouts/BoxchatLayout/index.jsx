import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SockJsClient from 'react-stomp';

import styles from './BoxchatLayout.module.scss';
import LeftSide from './components/LeftSide';
import RightSide from './components/RightSide';
const cx = classNames.bind(styles);

function BoxchatLayout({
  listUserOnline,
  setListUserOnline,
  handleDisconnect,
}) {
  const [user, setUser] = useState({});
  const currentUser = useSelector((state) => state.auth.login?.currentUser);
  const sockRef = useRef(null);
  const [state, setState] = useState({
    messages: JSON.parse(localStorage.getItem('messages') || '{}'),
    from: '',
    to: '',
    typedMessage: '',
  });
  const [listImages, setListImages] = useState([]);
  const [activeLink, setActiveLink] = useState(null);

  const onClick = (item) => {
    setUser(item);
    setActiveLink({
      activeLink: item.id,
    });
    setListImages([]);
    setState((prev) => ({ ...prev, typedMessage: '' }));
  };

  useEffect(() => {
    const handleTabClose = (e) => {
      e.preventDefault();
      sockRef.current?.sendMessage(
        '/app/user-online',
        JSON.stringify({
          id: currentUser.id,
          status: false,
        }),
      );
      console.log('close');
    };

    window.addEventListener('beforeunload', handleTabClose);

    return () => {
      window.removeEventListener('beforeunload', handleTabClose);
    };
  }, []);

  return (
    <div className={cx('wrapper')}>
      <SockJsClient
        url="http://localhost:8080/websocket-chat/"
        topics={['/topic/userOnline']}
        ref={sockRef}
        onConnect={() => {
          sockRef.current?.sendMessage(
            '/app/user-online',
            JSON.stringify({
              id: currentUser.id,
              status: true,
            }),
          );
        }}
        onDisconnect={() => {
          console.log('Disconnected');
          handleDisconnect(currentUser.id);
        }}
        onMessage={(msg) => {
          // console.log(msg);
          const result = {};
          for (const item of msg) {
            result[item.id] = item;
          }
          setListUserOnline(result);
        }}
      />

      <SockJsClient
        url="http://localhost:8080/websocket-chat/"
        topics={['/topic/user']}
        onConnect={() => {}}
        onDisconnect={() => {}}
        onMessage={(msg) => {
          const id = Number(msg?.to) === currentUser?.id ? msg?.from : msg?.to;
          const jobs = state.messages[id] ?? [];
          jobs.push(msg);
          setState((prev) => ({
            ...prev,
            messages: {
              ...state.messages,
              [id]: jobs,
            },
          }));
          localStorage.setItem(
            'messages',
            JSON.stringify({
              ...state.messages,
              [id]: jobs,
            }),
          );
        }}
      />

      <div className={cx('container')}>
        <LeftSide
          onClick={onClick}
          state={state}
          listUserOnline={listUserOnline}
          activeLink={activeLink}
        />
        <RightSide
          user={user}
          state={state}
          setState={setState}
          listUserOnline={listUserOnline}
          listImages={listImages}
          setListImages={setListImages}
        />
      </div>
    </div>
  );
}

export default BoxchatLayout;
