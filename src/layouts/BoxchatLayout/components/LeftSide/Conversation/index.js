import classNames from 'classnames/bind';
import Image from '~/components/Image';
import styles from './Conversation.module.scss';

const cx = classNames.bind(styles);

function Conversation({}) {
    // const classes = cx('conversation', {
    //     unseen,
    // });

    return (
        <div>
            <div className={cx('conversation', 'unseen')}>
                <div className={cx('imgbx')}>
                    <Image src="" className={cx('cover')} alt="" />
                </div>
                <div className={cx('details')}>
                    <div className={cx('listhead')}>
                        <h4>Nguyễn Thành Hưng</h4>
                        <p className={cx('time')}>12:40</p>
                    </div>
                    <div className={cx('message')}>
                        <p>123 456 789 123 456 789 123 456 789 123 456 789</p>
                        <b>2</b>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Conversation;
