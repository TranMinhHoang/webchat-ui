import classNames from 'classnames/bind';
import styles from './RightSide.module.scss';
import BoxChat from './BoxChat';
import Starting from './Starting';

const cx = classNames.bind(styles);

function RightSide({ user }) {
    const displayBoxChat = () => {
        if (Object.keys(user).length !== 0) {
            return <BoxChat user={user} />;
        } else {
            return <Starting />;
        }
    };

    return <div className={cx('rightside')}>{displayBoxChat()}</div>;
}

export default RightSide;
