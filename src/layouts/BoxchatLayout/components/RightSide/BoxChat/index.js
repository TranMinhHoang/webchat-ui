import SockJsClient from 'react-stomp';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSmile, faImage } from '@fortawesome/free-solid-svg-icons';

import styles from './BoxChat.module.scss';
import NameComponent from './NameComponent';

const cx = classNames.bind(styles);

function BoxChat() {
    const [state, setState] = useState({
        messages: [],
        name: '',
        contentMessage: '',
    });
    const messageEndRef = useRef();
    const clientRef = useRef();

    useEffect(() => {
        scrollToBottom();
    });

    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' });
    };

    const setName = (name) => {
        console.log(name);
        setState((prev) => ({ ...prev, name: name }));
    };

    const sendMessage = () => {
        clientRef.current.sendMessage(
            '/app/user-all',
            JSON.stringify({
                name: state.name,
                message: state.contentMessage,
            }),
        );
    };

    const handleChangeInput = (e) => {
        setState((prev) => ({
            ...prev,
            contentMessage: e.target.value,
        }));
    };

    const displayMessages = () => {
        return (
            <div>
                {state.messages.map((msg) => {
                    return (
                        <div>
                            {state.name === msg.name ? (
                                <div>
                                    <p className="title1">{msg.name} : </p>
                                    <br />
                                    <p>{msg.message}</p>
                                </div>
                            ) : (
                                <div>
                                    <p className="title2">{msg.name} : </p>
                                    <br />
                                    <p>{msg.message}</p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <>
            <div className={cx('chatbox')}>
                <NameComponent setName={setName} />
                {displayMessages()}

                <div ref={messageEndRef} />
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
                        var jobs = state.messages;
                        jobs.push(msg);
                        setState((prev) => ({ ...prev, messages: jobs }));
                        console.log(state);
                    }}
                    ref={clientRef}
                />
            </div>
            <div className={cx('chatbox_input')}>
                <FontAwesomeIcon className={cx('icon')} icon={faFaceSmile} />
                <FontAwesomeIcon className={cx('icon')} icon={faImage} />
                <input
                    value={state.contentMessage}
                    type="text"
                    placeholder="Soạn tin nhắn"
                    onChange={handleChangeInput}
                />
                {/* <img src={images.send} className={cx('icon', 'send')} alt="" /> */}
                <svg className={cx('send')} viewBox="0 0 24 30" onClick={sendMessage}>
                    <path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 C22.8132856,11.0605983 22.3423792,10.4322088 21.714504,10.118014 L4.13399899,1.16346272 C3.34915502,0.9 2.40734225,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.8376543,3.0486314 1.15159189,3.99121575 L3.03521743,10.4322088 C3.03521743,10.5893061 3.34915502,10.7464035 3.50612381,10.7464035 L16.6915026,11.5318905 C16.6915026,11.5318905 17.1624089,11.5318905 17.1624089,12.0031827 C17.1624089,12.4744748 16.6915026,12.4744748 16.6915026,12.4744748 Z"></path>
                </svg>

                {/* <div className={cx('message', 'my_message')}>
                    <p>
                        Hi
                        <br />
                        <span>12:12</span>
                    </p>
                </div>
                <div className={cx('message', 'frnd_message')}>
                    <p>
                        hello
                        <br />
                        12:12
                    </p>
                </div>
                <div className={cx('message', 'my_message')}>
                    <p>
                        Hi
                        <br />
                        <span>12:12</span>
                    </p>
                </div>
                <div className={cx('message', 'frnd_message')}>
                    <p>
                        đang làm gì đấy
                        <br />
                        12:13
                    </p>
                </div>
                <div className={cx('message', 'my_message')}>
                    <p>
                        Đang tìm điện thoại
                        <br />
                        <span>12:13</span>
                    </p>
                </div>
                <div className={cx('message', 'frnd_message')}>
                    <p>
                        Tìm ở đâu
                        <br />
                        12:14
                    </p>
                </div>
                <div className={cx('message', 'my_message')}>
                    <p>
                        Tìm chỗ mất chứ ở đâu
                        <br />
                        <span>12:15</span>
                    </p>
                </div>
                <div className={cx('message', 'frnd_message')}>
                    <p>
                        Chán vậy
                        <br />
                        12:15
                    </p>
                </div>
                <div className={cx('message', 'my_message')}>
                    <p>
                        ừ! buồn
                        <br />
                        <span>12:16</span>
                    </p>
                </div>
                <div ref={messageEndRef} className={cx('message', 'frnd_message')}>
                    <p>
                        Thôi tìm đi! Hưng đi ngủ đây!chiều còn học
                        <br />
                        12:17
                    </p>
                </div> */}
            </div>
        </>
    );
}

export default BoxChat;
