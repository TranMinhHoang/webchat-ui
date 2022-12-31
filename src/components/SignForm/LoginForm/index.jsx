import classNames from 'classnames/bind';
import styles from '~/components/SignForm/SignForm.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import FormGroup from '../components/FormGroup';
import { login } from '~/redux/apiRequest';
import { useDispatch } from 'react-redux';
// import { login } from '~/apis/auth';

const cx = classNames.bind(styles);

function LoginForm() {
    const [info, setInfo] = useState({
        username: '',
        password: '',
    });
    const [errorSubmitted, seErrorSubmitted] = useState(false);
    const [systemErrorMessage, setSySErrorMessage] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const errorMessage = {
        username: () => {
            if (info.username === '') {
                return 'Hãy nhập tên đăng nhập!';
            } else return true;
        },
        password: () => {
            if (info.password === '') {
                return 'Hãy nhập mật khẩu!';
            } else return true;
        },
    };

    const handleChangeInput = (e) => {
        setInfo((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
        setSySErrorMessage(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (info.username === '' || info.password === '') {
            seErrorSubmitted(true);
        } else {
            login(info, dispatch, navigate, setSySErrorMessage);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (info.username === '' || info.password === '') {
                seErrorSubmitted(true);
            } else {
                login(info, dispatch, navigate, setSySErrorMessage);
            }
        }
    };

    return (
        <form action="" method="POST">
            <h1 className={cx('form-heading')}>Đăng nhập</h1>
            {systemErrorMessage && (
                <p className={cx('system-error')}>
                    Sai tên đăng nhập hoặc mật khẩu!
                </p>
            )}
            <FormGroup
                type="text"
                name="username"
                placeholder="Tên đăng nhập"
                value={info.username}
                onChange={handleChangeInput}
                onKeyDown={handleKeyDown}
                errorMessage={errorMessage}
                errorSubmitted={errorSubmitted}
            />
            <FormGroup
                type="password"
                name="password"
                placeholder="Mật khẩu"
                value={info.password}
                onChange={handleChangeInput}
                onKeyDown={handleKeyDown}
                errorMessage={errorMessage}
                errorSubmitted={errorSubmitted}
            />

            <input
                type="submit"
                value="Đăng nhập"
                className={cx('form-submit')}
                onClick={handleSubmit}
            />
            <Link to="/register">
                <button className={cx('sign-btn')}>Đăng ký</button>
            </Link>
        </form>
    );
}

export default LoginForm;
