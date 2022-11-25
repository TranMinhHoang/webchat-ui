import classNames from 'classnames/bind';
import styles from '~/components/SignForm/SignForm.module.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import FormGroup from '../components/FormGroup';

const cx = classNames.bind(styles);

function RegisterForm() {
    // const regex = {
    //     email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    // };

    // const [errorMessage, setErrorMessage] = useState(false);
    // const [errorConFirmPassword, setErrorConFirmPassword] = useState(false);
    // const [errorEmail, setErrorEmail] = useState(false);

    // const ref = {
    //     userNameRef: useRef(),
    //     passwordRef: useRef(),
    //     conFirmPassword: useRef(),
    //     email: useRef(),
    //     phone: useRef(),
    // };

    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     const currentPassword = ref.passwordRef.current.value;
    //     const currentConfirmPassword = ref.conFirmPassword.current.value;
    //     const currentEmail = ref.email.current.value;
    //     let invalid = false;

    //     var info = Object.values(ref).reduce((values, input) => {
    //         if (input.current.value === '') {
    //             invalid = true;
    //             setErrorMessage(invalid);
    //         } else {
    //             values[input.current.name] = input.current.value;
    //             invalid = false;
    //             setErrorMessage(invalid);
    //         }

    //         if (currentPassword.length < 6) {
    //             invalid = true;
    //             setErrorMessage(invalid);
    //         }

    //         if (currentConfirmPassword !== currentPassword) {
    //             // invalid = true;
    //             setErrorConFirmPassword(!errorConFirmPassword);
    //         }

    //         if (!regex.email.test(currentEmail)) {
    //             invalid = true;
    //             setErrorEmail(invalid);
    //         }

    //         return values;
    //     }, {});

    //     if (!invalid) {
    //         console.log(info);
    //     }
    // };

    const [info, setInfo] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        phone: '',
    });
    const [errorSubmitted, seErrorSubmitted] = useState(false);

    const regex = {
        email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        phone: /^[0-9][A-Za-z0-9 -]*$/,
    };

    const errorMessage = {
        username: () => {
            if (info.username === '') {
                return {
                    message: 'Hãy nhập tên đăng nhập!',
                    invalid: true,
                };
            } else return true;
        },
        password: () => {
            if (info.password.length <= 0) {
                return {
                    message: 'Hãy nhập mật khẩu!',
                    invalid: true,
                };
            } else if (info.password.length < 6) {
                return {
                    message: 'Mật khẩu phải trên 6 ký tự!',
                    invalid: true,
                };
            } else return true;
        },
        confirmPassword: () => {
            if (info.confirmPassword.length <= 0) {
                return {
                    message: 'Hãy nhập xác nhận mật khẩu!',
                    invalid: true,
                };
            }
            if (info.confirmPassword !== info.password) {
                return {
                    message: 'Mật khẩu không trùng khớp!',
                    invalid: true,
                };
            } else return true;
        },
        email: () => {
            if (info.email === '') {
                return {
                    message: 'Hãy nhập email!',
                    invalid: true,
                };
            }
            if (!regex.email.test(info.email)) {
                return {
                    message: 'Địa chỉ email không hợp lệ!',
                    invalid: true,
                };
            } else return true;
        },
        phone: () => {
            if (info.phone === '') {
                return {
                    message: 'Hãy nhập số điện thoại!',
                    invalid: true,
                };
            }
            if (!regex.phone.test(info.phone)) {
                return {
                    message: 'Số điện thoại không hợp lệ!',
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
        if (
            (info.username === '') |
            (0 < info.password.length < 6) |
            (info.confirmPassword !== info.password) |
            (info.email === '' && regex.email.test(info.email)) |
            (info.phone === '' && regex.phone.test(info.phone))
        ) {
            seErrorSubmitted(true);
        } else {
            console.log(info);
        }
    };

    return (
        <form action="" method="POST">
            <h1 className={cx('form-heading')}>Đăng ký</h1>
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
            <FormGroup
                type="password"
                name="confirmPassword"
                placeholder="Xác nhận mật khẩu"
                value={info.confirmPassword}
                onChange={handleChangeInput}
                errorMessage={errorMessage}
                errorSubmitted={errorSubmitted}
            />
            <FormGroup
                type="text"
                name="email"
                placeholder="Email"
                value={info.email}
                onChange={handleChangeInput}
                errorMessage={errorMessage}
                errorSubmitted={errorSubmitted}
            />
            <FormGroup
                type="text"
                name="phone"
                placeholder="Số điện thoại"
                value={info.phone}
                onChange={handleChangeInput}
                errorMessage={errorMessage}
                errorSubmitted={errorSubmitted}
            />
            {/* <FormGroupText
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
            <FormGroupText placeholder="Số điện thoại" name="phone" ref={ref.phone} errorMessage={errorMessage} /> */}
            <input type="submit" value="Đăng ký" className={cx('form-submit')} onClick={handleSubmit} />
            <Link to="/login">
                <button className={cx('sign-btn')}>Đăng nhập</button>
            </Link>
        </form>
    );
}

export default RegisterForm;
