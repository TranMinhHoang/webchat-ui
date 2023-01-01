import classNames from 'classnames/bind';
import { useEffect, useState, useRef } from 'react';
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
    // const [listUserOnline, setListUserOnline] = useState({});

    const onClick = (item) => {
        setUser(item);
    };
    console.log(listUserOnline);
    return (
        <div className={cx('wrapper')}>
            <SockJsClient
                url="http://localhost:8080/websocket-chat/"
                topics={['/topic/userOnline']}
                ref={sockRef}
                onConnect={() => {
                    sockRef.current.sendMessage(
                        '/app/user-online',
                        JSON.stringify({
                            id: currentUser.id,
                            status: true,
                        }),
                    );
                    console.log('connected', 'userOnline');
                }}
                onDisconnect={() => {
                    console.log('Disconnected');
                    handleDisconnect(currentUser.id);
                }}
                onMessage={(msg) => {
                    console.log(msg);
                    const jobs = listUserOnline[msg.id] ?? [];
                    jobs.push(msg);
                    console.log(jobs, 'jobs');
                    setListUserOnline((prev) => ({
                        ...prev,
                        [msg.id]: jobs,
                    }));
                    localStorage.setItem(
                        'userOnline',
                        JSON.stringify({
                            ...listUserOnline,
                            [msg.id]: jobs,
                        }),
                    );
                    // const jobs = state.messages[id] ?? [];
                    // jobs.push(msg);
                    // setState((prev) => ({
                    //     ...prev,
                    //     messages: {
                    //         ...state.messages,
                    //         [id]: jobs,
                    //     },
                    // }));
                    // localStorage.setItem(
                    //     'messages',
                    //     JSON.stringify({
                    //         ...state.messages,
                    //         [id]: jobs,
                    //     }),
                    // );
                    // const result = {};
                    // for (const item of msg) {
                    //     if (!result[item.id]) {
                    //         result[item.id] = item.status;
                    //     }
                    // }
                    // console.log(msg);
                    // console.log(msg.slice(-1)[0].id);
                    // setListUserOnline((prev) => ({
                    //     ...prev,
                    //     ...result,
                    // }));
                }}
            />

            <SockJsClient
                url="http://localhost:8080/websocket-chat/"
                topics={['/topic/user']}
                onConnect={() => {
                    console.log('connected');
                }}
                onDisconnect={() => {
                    console.log('Disconnected');
                }}
                onMessage={(msg) => {
                    const id =
                        Number(msg?.to) === currentUser?.id
                            ? msg?.from
                            : msg?.to;
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
                />
                <RightSide user={user} state={state} setState={setState} />
            </div>
        </div>
    );
}

export default BoxchatLayout;
