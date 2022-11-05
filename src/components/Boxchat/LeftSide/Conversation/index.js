import classNames from 'classnames/bind';
import { Fragment } from 'react';
import styles from './Conversation.module.scss';

const cx = classNames.bind(styles);

function Conversation({ classNames, srcImg, name, time, message, unseen }) {
    return (
        <div>
            <div className={cx(classNames[0], classNames[1])}>
                <div className={cx('imgbx')}>
                    <img src={srcImg} className={cx('cover')} alt="" />
                </div>
                <div className={cx('details')}>
                    <div className={cx('listhead')}>
                        <h4>{name}</h4>
                        <p className={cx('time')}>{time}</p>
                    </div>
                    <div className={cx('message')}>
                        <p>{message}</p>
                        {unseen ? <b>{unseen}</b> : <Fragment />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Conversation;
