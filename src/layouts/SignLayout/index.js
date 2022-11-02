import classNames from 'classnames/bind';
import styles from './SignLayout.module.scss';

const cx = classNames.bind(styles);

function SignLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('sign-form')}>{children}</div>
        </div>
    );
}

export default SignLayout;
