import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './FormGroup.module.scss';

const cx = classNames.bind(styles);

function FormGroup({ type, placeholder }) {
    if (type === 'password') {
        return (
            <div className={cx('form-group')}>
                <input type={type} className={cx('form-input')} placeholder={placeholder} />
                <div>
                    <FontAwesomeIcon className={cx('faEye-icon')} icon={faEye} />
                </div>
            </div>
        );
    } else {
        return (
            <div className={cx('form-group')}>
                <input type={type} className={cx('form-input')} placeholder={placeholder} />
            </div>
        );
    }
}

export default FormGroup;
