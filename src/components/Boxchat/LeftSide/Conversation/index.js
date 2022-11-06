import classNames from 'classnames/bind';
import styles from './Conversation.module.scss';

const cx = classNames.bind(styles);

function Conversation({ unseen, srcImg, name, time, message }) {
    const classes = cx('conversation', {
        unseen,
    });

    return (
        <div>
            <div className={classes}>
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
                        {unseen && <b>{unseen}</b>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Conversation;
