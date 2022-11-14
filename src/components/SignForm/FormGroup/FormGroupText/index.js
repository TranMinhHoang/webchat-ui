import classNames from 'classnames/bind';
import styles from '../FormGroup.module.scss';

const cx = classNames.bind(styles);

function FormGroupText({ placeholder }) {
    return (
        <div className={cx('form-group')}>
            <input type="text" className={cx('form-input')} placeholder={placeholder} />
        </div>
    );
}

export default FormGroupText;
