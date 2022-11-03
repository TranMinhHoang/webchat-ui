import classNames from 'classnames/bind';
import styles from './RightSide.module.scss';

const cx = classNames.bind(styles);

function RightSide({ children }) {
    return <div className={cx('rightside')}>{children}</div>;
}

export default RightSide;
