import classNames from 'classnames/bind';
import styles from '~/components/SignForm/SignForm.module.scss';
import { Link } from 'react-router-dom';
import FormGroupText from '../components/FormGroupText';
import FormGroupPassword from '../components/FormGroupPassword';
import { useRef, useState } from 'react';

const cx = classNames.bind(styles);

function RegisterForm() {
    const regex = {
        email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    };

    const [errorMessage, setErrorMessage] = useState(false);
    const [errorConFirmPassword, setErrorConFirmPassword] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);

    const ref = {
        userNameRef: useRef(),
        passwordRef: useRef(),
        conFirmPassword: useRef(),
        email: useRef(),
        phone: useRef(),
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const currentPassword = ref.passwordRef.current.value;
        const currentConfirmPassword = ref.conFirmPassword.current.value;
        const currentEmail = ref.email.current.value;
        let invalid = false;

        var info = Object.values(ref).reduce((values, input) => {
            if (input.current.value === '') {
                invalid = true;
                setErrorMessage(invalid);
            } else {
                values[input.current.name] = input.current.value;
                invalid = false;
                setErrorMessage(invalid);
            }

            if (currentPassword.length < 6) {
                invalid = true;
                setErrorMessage(invalid);
            }

            if (currentConfirmPassword !== currentPassword) {
                // invalid = true;
                setErrorConFirmPassword(!errorConFirmPassword);
            }

            if (!regex.email.test(currentEmail)) {
                invalid = true;
                setErrorEmail(invalid);
            }

            return values;
        }, {});

        if (!invalid) {
            console.log(info);
        }
    };

    return (
        <form action="" method="POST">
            <h1 className={cx('form-heading')}>Đăng ký</h1>
            <FormGroupText
                placeholder="Tên đăng nhập"
                name="username"
                ref={ref.userNameRef}
                errorMessage={errorMessage}
            />
            <FormGroupPassword
                placeholder="Mật khẩu"
                name="password"
                ref={ref.passwordRef}
                errorMessage={errorMessage}
            />
            <FormGroupPassword
                placeholder="Xác nhận mật khẩu"
                name="confirmPassword"
                ref={ref.conFirmPassword}
                errorMessage={errorMessage}
                errorConFirmPassword={errorConFirmPassword}
            />
            <FormGroupText
                placeholder="Email"
                name="email"
                ref={ref.email}
                errorMessage={errorMessage}
                errorEmail={errorEmail}
            />
            <FormGroupText placeholder="Số điện thoại" name="phone" ref={ref.phone} errorMessage={errorMessage} />
            <input type="submit" value="Đăng ký" className={cx('form-submit')} onClick={handleSubmit} />
            <Link to="/login">
                <button className={cx('sign-btn')}>Đăng nhập</button>
            </Link>
        </form>
    );
}

export default RegisterForm;
