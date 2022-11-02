import classNames from 'classnames/bind';
import styles from './SignButton.module.scss';

const cx = classNames.bind(styles);

function SignButton({ type, value }) {
    return <input type={type} value={value} className={cx('form-submit')} />;
}

export default SignButton;
