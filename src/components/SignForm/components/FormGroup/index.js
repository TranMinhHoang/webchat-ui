import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from '~/components/SignForm/SignForm.module.scss';
import { useMemo, useRef, useState } from 'react';

const cx = classNames.bind(styles);

function FormGroup({ name, type, placeholder, value = '', maxLength, onChange, errorMessage, errorSubmitted = false }) {
    const inputRef = useRef();
    const [firstRender, setFirstRender] = useState(true);

    const handleShowPassword = () => {
        inputRef.current.type = inputRef.current.type === 'password' ? 'text' : 'password';
        inputRef.current.focus();
        inputRef.current.setSelectionRange(value.length, value.length);
    };

    const handleBlur = () => {
        inputRef.current.value === '' && setFirstRender(false);
    };

    useMemo(() => {
        if (value !== '') {
            setFirstRender(false);
        }
        if (errorSubmitted) {
            setFirstRender(false);
        }
    }, [value, errorSubmitted]);

    return (
        <>
            <div className={cx('form-group')}>
                <input
                    ref={inputRef}
                    name={name}
                    value={value}
                    spellCheck={false}
                    type={type}
                    maxLength={maxLength}
                    className={cx('form-input')}
                    placeholder={placeholder}
                    onChange={onChange}
                    onBlur={handleBlur}
                />
                {type === 'password' && (
                    <div>
                        <FontAwesomeIcon className={cx('faEye-icon')} icon={faEye} onClick={handleShowPassword} />
                    </div>
                )}
            </div>
            {!firstRender && name === 'username' && <p className={cx('error-text')}>{errorMessage.username()}</p>}
            {!firstRender && name === 'password' && <p className={cx('error-text')}>{errorMessage.password()}</p>}
            {!firstRender && name === 'confirmPassword' && (
                <p className={cx('error-text')}>{errorMessage.confirmPassword()}</p>
            )}
            {!firstRender && name === 'email' && <p className={cx('error-text')}>{errorMessage.email()}</p>}
            {!firstRender && name === 'phone' && <p className={cx('error-text')}>{errorMessage.phone()}</p>}
        </>
    );
}

export default FormGroup;
