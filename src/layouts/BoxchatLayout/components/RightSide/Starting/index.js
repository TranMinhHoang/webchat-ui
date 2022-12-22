import classNames from 'classnames/bind';
import styles from './Starting.module.scss';

const cx = classNames.bind(styles);

function Starting() {
    return (
        <div className={cx('container')}>
            <div>
                <h1 className={cx('title')}>Chào mừng đến với Web Chat!</h1>
                <p className={cx('text')}>Hãy chọn một người bạn muốn trò chuyện.</p>
            </div>
        </div>
    );
}

export default Starting;
