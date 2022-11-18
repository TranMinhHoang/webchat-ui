import { forwardRef, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from '~/components/SignForm/SignForm.module.scss';

const cx = classNames.bind(styles);

const FormGroupPassword = forwardRef(
    ({ placeholder, name, errorMessage = false, errorConFirmPassword = false }, ref) => {
        const [passwordValue, setPasswordValue] = useState('');
        const [errorRequired, setErrorRequired] = useState(errorMessage);
        const [errorLength, setErrorLength] = useState(errorMessage);
        const [_errorConFirmPassword, setErrorConFirmPassword] = useState(errorConFirmPassword);

        // xóa lỗi khi người dùng nhập
        useEffect(() => {
            setErrorRequired(false);
            setErrorLength(false);
            setErrorConFirmPassword(false);
        }, [passwordValue]);

        useEffect(() => {
            setErrorRequired(errorMessage);
        }, [errorMessage]);

        useEffect(() => {
            setErrorConFirmPassword(true);
        }, [errorConFirmPassword]);

        const handleShowPassword = () => {
            ref.current.type = ref.current.type === 'password' ? 'text' : 'password';
            ref.current.focus();
            ref.current.setSelectionRange(passwordValue.length, passwordValue.length);
        };

        const handleBlur = () => {
            passwordValue === '' ? setErrorRequired(true) : setErrorRequired(false);
            passwordValue.length > 0 && passwordValue.length < 6 ? setErrorLength(true) : setErrorLength(false);
        };

        return (
            <>
                <div className={cx('form-group')}>
                    <input
                        ref={ref}
                        name={name}
                        value={passwordValue}
                        spellCheck={false}
                        type={'password'}
                        className={cx('form-input')}
                        placeholder={placeholder}
                        onChange={(e) => setPasswordValue(e.target.value)}
                        onBlur={handleBlur}
                    />
                    <div>
                        <FontAwesomeIcon className={cx('faEye-icon')} icon={faEye} onClick={handleShowPassword} />
                    </div>
                </div>
                {errorRequired && passwordValue === '' && (
                    <p className={cx('error-text')}>{`Hãy nhập ${placeholder}`}</p>
                )}
                {errorLength && passwordValue.length < 6 && (
                    <p className={cx('error-text')}>{`Nhập ${placeholder} tối thiểu 6 ký tự`}</p>
                )}
                {_errorConFirmPassword && passwordValue !== '' && (
                    <p className={cx('error-text')}>Mật khẩu không trùng khớp</p>
                )}
            </>
        );
    },
);

export default FormGroupPassword;
