import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from '../FormGroup.module.scss';

const cx = classNames.bind(styles);

function FormGroupPassword({ placeholder }) {
    const [passwordValue, setPasswordValue] = useState('');

    const inputRef = useRef();

    const handleShowPassword = () => {
        inputRef.current.type = inputRef.current.type === 'password' ? 'text' : 'password';
        inputRef.current.focus();
        inputRef.current.setSelectionRange(passwordValue.length, passwordValue.length);
    };

    return (
        <div className={cx('form-group')}>
            <input
                ref={inputRef}
                value={passwordValue}
                type={'password'}
                className={cx('form-input')}
                placeholder={placeholder}
                onChange={(e) => setPasswordValue(e.target.value)}
            />
            <div>
                <FontAwesomeIcon className={cx('faEye-icon')} icon={faEye} onClick={handleShowPassword} />
            </div>
        </div>
    );
}

export default FormGroupPassword;
