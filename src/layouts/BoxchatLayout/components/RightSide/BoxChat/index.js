/* eslint-disable array-callback-return */
import SockJsClient from 'react-stomp';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEllipsisVertical,
    faFaceSmile,
    faImage,
    faSearch,
} from '@fortawesome/free-solid-svg-icons';

import styles from './BoxChat.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import Image from '~/components/Image';
import { getConversation } from '~/redux/conversationSlice';
import { json } from 'react-router-dom';

const cx = classNames.bind(styles);

function BoxChat({ user: userFriend }) {
    // const messages = useSelector((state) => state.conversation.conversations);
    // const count = useSelector((state) => state.conversation.count);
    const dispatch = useDispatch();
    const [state, setState] = useState({
        messages: JSON.parse(localStorage.getItem('messages') || '{}'),
        name: '',
        typedMessage: '',
    });

    const messageEndRef = useRef();
    const clientRef = useRef();
    const inputRef = useRef();
    const user = useSelector((state) => state.auth.login?.currentUser);

    // const userList = useSelector((state) => state.user.users?.allUsers);

    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({
            block: 'end',
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        setState((prev) => ({ ...prev, name: user?.fullname }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const sendMessage = () => {
        if (inputRef.current.value !== '') {
            clientRef.current.sendMessage(
                '/app/user-all',
                JSON.stringify({
                    name: state.name,
                    message: state.typedMessage,
                }),
            );
            setState((prev) => ({ ...prev, typedMessage: '' }));
            inputRef.current.focus();
        } else inputRef.current.focus();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    const handleChangeInput = (e) => {
        setState((prev) => ({
            ...prev,
            typedMessage: e.target.value,
        }));
    };

    const displayMessages = () => {
        return (
            <div>
                {!!Object.keys(state.messages).length &&
                    state?.messages?.[userFriend.id]?.map((msg, index) => {
                        return (
                            <div key={index}>
                                {state.name === msg.name ? (
                                    <div
                                        className={cx('message', 'my_message')}
                                    >
                                        <div>
                                            <p>{msg.message}</p>
                                            <span>12:12</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        className={cx(
                                            'message',
                                            'frnd_message',
                                        )}
                                    >
                                        <div>
                                            <p>{msg.message}</p>
                                            <span>12:12</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
            </div>
        );
    };

    // useEffect(() => {
    //     scrollToBottom();
    // });

    return (
        <>
            <div className={cx('header')}>
                <div className={cx('imgtext')}>
                    <div className={cx('userimg')}>
                        <Image src="" className={cx('cover')} alt="" />
                    </div>

                    <h4>{userFriend.fullname}</h4>
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
            <div className={cx('chatbox')}>
                {displayMessages()}
                <div ref={messageEndRef} className="abc" />

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
                        var jobs = state.messages[userFriend.id] ?? [];
                        jobs.push(msg);
                        setState((prev) => ({
                            ...prev,
                            messages: {
                                ...state.messages,
                                [userFriend.id]: jobs,
                            },
                        }));
                        localStorage.setItem(
                            'messages',
                            JSON.stringify({
                                ...state.messages,
                                [userFriend.id]: jobs,
                            }),
                        );
                        scrollToBottom();
                        console.log(state);
                    }}
                    ref={clientRef}
                />
            </div>

            <div className={cx('chatbox_input')}>
                <FontAwesomeIcon className={cx('icon')} icon={faFaceSmile} />
                <FontAwesomeIcon className={cx('icon')} icon={faImage} />
                <input
                    ref={inputRef}
                    value={state.typedMessage}
                    type="text"
                    placeholder="Soạn tin nhắn"
                    onChange={handleChangeInput}
                    onKeyDown={handleKeyDown}
                />
                {/* <img src={images.send} className={cx('icon', 'send')} alt="" /> */}
                <svg
                    className={cx('send')}
                    viewBox="0 0 24 30"
                    onClick={sendMessage}
                >
                    <path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 C22.8132856,11.0605983 22.3423792,10.4322088 21.714504,10.118014 L4.13399899,1.16346272 C3.34915502,0.9 2.40734225,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.8376543,3.0486314 1.15159189,3.99121575 L3.03521743,10.4322088 C3.03521743,10.5893061 3.34915502,10.7464035 3.50612381,10.7464035 L16.6915026,11.5318905 C16.6915026,11.5318905 17.1624089,11.5318905 17.1624089,12.0031827 C17.1624089,12.4744748 16.6915026,12.4744748 16.6915026,12.4744748 Z"></path>
                </svg>
            </div>
        </>
    );
}

export default BoxChat;
