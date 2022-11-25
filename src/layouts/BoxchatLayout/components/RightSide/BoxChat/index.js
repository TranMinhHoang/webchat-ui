import classNames from 'classnames/bind';
import { useEffect, useRef } from 'react';
import styles from './BoxChat.module.scss';

const cx = classNames.bind(styles);

function BoxChat() {
    const messageEndRef = useRef();

    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    });

    return (
        <div className={cx('chatbox')}>
            <div className={cx('message', 'my_message')}>
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
            </div>
            <div ref={messageEndRef} />
        </div>
    );
}

export default BoxChat;
