import classNames from 'classnames/bind';
import styles from '~/components/SignForm/SignForm.module.scss';
import { Link } from 'react-router-dom';
import FormGroupPassword from '../components/FormGroupPassword';
import { useRef, useState } from 'react';
import FormGroupText from '../components/FormGroupText';

const cx = classNames.bind(styles);

function LoginForm() {
    const [errorMessage, setErrorMessage] = useState(false);

    const ref = {
        userNameRef: useRef(),
        passwordRef: useRef(),
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let currentPassword = ref.passwordRef.current.value;
        let payload = false;

        var info = Object.values(ref).reduce((values, input) => {
            if (input.current.value === '') {
                payload = true;
                setErrorMessage(payload);
            } else {
                values[input.current.name] = input.current.value;
                payload = false;
                setErrorMessage(payload);
            }

            if (currentPassword.length < 6) {
                payload = true;
                setErrorMessage(payload);
            }
            return values;
        }, {});
        console.log(errorMessage);
        if (!payload) {
            console.log(info);
        }
    };

    return (
        <form action="" method="POST">
            <h1 className={cx('form-heading')}>Đăng nhập</h1>
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
            <input type="submit" value="Đăng nhập" className={cx('form-submit')} onClick={handleSubmit} />
            <Link to="/register">
                <button className={cx('sign-btn')}>Đăng ký</button>
            </Link>
        </form>
    );
}

export default LoginForm;
