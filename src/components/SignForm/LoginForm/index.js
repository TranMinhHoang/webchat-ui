import classNames from 'classnames/bind';
import styles from '~/components/SignForm/SignForm.module.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import FormGroup from '../components/FormGroup';
import { login } from '~/apis/auth';

const cx = classNames.bind(styles);

function LoginForm() {
    const [info, setInfo] = useState({
        username: '',
        password: '',
    });
    const [errorSubmitted, seErrorSubmitted] = useState(false);

    const errorMessage = {
        username: () => {
            if (info.username === '') {
                return {
                    message: 'Hãy nhập tên đăng nhập!',
                    invalid: false,
                };
            } else return true;
        },
        password: () => {
            if (info.password === '') {
                return {
                    message: 'Hãy nhập mật khẩu!',
                    invalid: true,
                };
            } else return true;
        },
    };

    const handleChangeInput = (e) => {
        setInfo((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (info.username === '' || info.password === '') {
            seErrorSubmitted(true);
        } else {
            login(info)
                .then((res) => {
                    console.log(res);
                })
                .catch(() => {});
            // console.log(info);
        }
    };
    return (
        <form action="" method="POST">
            <h1 className={cx('form-heading')}>Đăng nhập</h1>

            <FormGroup
                type="text"
                name="username"
                placeholder="Tên đăng nhập"
                value={info.username}
                onChange={handleChangeInput}
                errorMessage={errorMessage}
                errorSubmitted={errorSubmitted}
            />
            <FormGroup
                type="password"
                name="password"
                placeholder="Mật khẩu"
                value={info.password}
                onChange={handleChangeInput}
                errorMessage={errorMessage}
                errorSubmitted={errorSubmitted}
            />

            <input type="submit" value="Đăng nhập" className={cx('form-submit')} onClick={handleSubmit} />
            <Link to="/register">
                <button className={cx('sign-btn')}>Đăng ký</button>
            </Link>
        </form>
    );
}

export default LoginForm;
