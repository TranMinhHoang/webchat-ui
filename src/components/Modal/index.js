import classNames from 'classnames/bind';
import styles from './Modal.module.scss';

const cx = classNames.bind(styles);

function Modal({ onClick, children }) {
    return (
        <div className={cx('modal')}>
            <div className={cx('modal__overlay')} onClick={onClick}></div>
            <div className={cx('modal__body')}>
                <div className={cx('auth-form')}>{children}</div>
            </div>
        </div>
    );
}

export default Modal;
