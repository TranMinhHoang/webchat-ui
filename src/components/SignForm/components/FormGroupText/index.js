import classNames from 'classnames/bind';
import { forwardRef, useEffect, useState } from 'react';
import styles from '~/components/SignForm/SignForm.module.scss';

const cx = classNames.bind(styles);

const FormGroupText = forwardRef(({ placeholder, name, errorMessage = false, errorEmail = false }, ref) => {
    const [inputValue, setInputValue] = useState('');
    const [errorRequired, setErrorRequired] = useState(errorMessage);
    const [_errorEmail, setErrorEmail] = useState(errorEmail);

    const handleBlur = () => {
        inputValue === '' ? setErrorRequired(true) : setErrorRequired(false);
    };

    // xóa errorMessage khi người dùng nhập
    useEffect(() => {
        setErrorRequired(false);
        setErrorEmail(false);
    }, [inputValue]);

    useEffect(() => {
        setErrorRequired(errorMessage);
    }, [errorMessage]);

    useEffect(() => {
        setErrorEmail(errorEmail);
        // console.log('email', errorEmail);
    }, [errorEmail]);

    return (
        <>
            <div className={cx('form-group')}>
                <input
                    ref={ref}
                    type="text"
                    className={cx('form-input')}
                    placeholder={placeholder}
                    name={name}
                    value={inputValue}
                    spellCheck={false}
                    onChange={(e) => setInputValue(e.target.value)}
                    onBlur={handleBlur}
                />
            </div>
            {errorRequired && inputValue === '' && <p className={cx('error-text')}>{`Hãy nhập ${placeholder}`}</p>}
            {_errorEmail && inputValue !== '' && <p className={cx('error-text')}>Sai địa chỉ Email</p>}
        </>
    );
});

export default FormGroupText;
