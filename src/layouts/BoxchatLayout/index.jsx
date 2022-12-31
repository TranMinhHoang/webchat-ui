import classNames from 'classnames/bind';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import SockJsClient from 'react-stomp';

import styles from './BoxchatLayout.module.scss';
import LeftSide from './components/LeftSide';
import RightSide from './components/RightSide';
const cx = classNames.bind(styles);

function BoxchatLayout() {
    const [user, setUser] = useState({});
    const crrentUser = useSelector((state) => state.auth.login?.currentUser);
    const [state, setState] = useState({
        messages: JSON.parse(localStorage.getItem('messages') || '{}'),
        from: '',
        to: '',
        typedMessage: '',
    });

    const onClick = (item) => {
        setUser(item);
    };

    return (
        <div className={cx('wrapper')}>
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
                        Number(msg?.to) === crrentUser?.id
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
                <LeftSide onClick={onClick} state={state} />
                <RightSide user={user} state={state} setState={setState} />
            </div>
        </div>
    );
}

export default BoxchatLayout;
