import classNames from 'classnames/bind';
import styles from './RightSide.module.scss';
import BoxChat from './BoxChat';

const cx = classNames.bind(styles);

function RightSide({ user, state, setState }) {
    const displayBoxChat = () => {
        if (Object.keys(user).length !== 0) {
            return <BoxChat user={user} state={state} setState={setState} />;
        } else {
            return (
                <div className={cx('container')}>
                    <div>
                        <h1 className={cx('title')}>
                            Chào mừng đến với Web Chat!
                        </h1>
                        <p className={cx('text')}>
                            Hãy chọn một người bạn muốn trò chuyện.
                        </p>
                    </div>
                </div>
            );
        }
    };

    return <div className={cx('rightside')}>{displayBoxChat()}</div>;
}

export default RightSide;
