import classNames from 'classnames/bind';
import styles from '~/components/SignForm/SignForm.module.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import FormGroup from '../components/FormGroup';
import { register } from '~/apis/auth';
import Modal from '~/components/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function RegisterForm() {
    const [info, setInfo] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        phone: '',
    });
    const [errorSubmitted, seErrorSubmitted] = useState(false);
    const [systemErrorMessage, setSySErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);

    const regex = {
        email: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        phone: /^-?\d+\.?\d*$/,
    };

    const errorMessage = {
        username: () => {
            if (info.username === '') {
                return 'Hãy nhập tên đăng nhập!';
            } else return true;
        },
        password: () => {
            if (info.password.length <= 0) {
                return 'Hãy nhập mật khẩu!';
            } else if (info.password.length < 6) {
                return 'Mật khẩu phải trên 6 ký tự!';
            } else return true;
        },
        confirmPassword: () => {
            if (info.confirmPassword.length <= 0) {
                return 'Hãy nhập xác nhận mật khẩu!';
            }
            if (info.confirmPassword !== info.password) {
                return 'Mật khẩu không trùng khớp!';
            } else return true;
        },
        email: () => {
            if (info.email === '') {
                return 'Hãy nhập email!';
            }
            if (!regex.email.test(info.email)) {
                return 'Địa chỉ email không hợp lệ!';
            } else return true;
        },
        phone: () => {
            if (info.phone === '') {
                return 'Hãy nhập số điện thoại!';
            }
            if (!regex.phone.test(info.phone)) {
                return 'Số điện thoại không hợp lệ!';
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
            info.username === '' ||
            (0 < info.password.length && info.password.length < 6) ||
            info.confirmPassword !== info.password ||
            info.email === '' ||
            !regex.email.test(info.email) ||
            info.phone === '' ||
            !regex.phone.test(info.phone)
        ) {
            seErrorSubmitted(true);
        } else {
            console.log(info);
            register(info)
                .then((res) => {
                    setSuccess(true);
                })
                .catch((err) => setSySErrorMessage(err.response.data.message));
        }
    };

    const handleCloseModal = () => {
        setSuccess(false);
    };

    return (
        <>
            <form action="" method="POST">
                <h1 className={cx('form-heading')}>Đăng ký</h1>
                <p className={cx('system-error')}>{systemErrorMessage}</p>
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
                    maxLength="10"
                    onChange={handleChangeInput}
                    errorMessage={errorMessage}
                    errorSubmitted={errorSubmitted}
                />

                <input type="submit" value="Đăng ký" className={cx('form-submit')} onClick={handleSubmit} />
                <Link to="/login">
                    <button className={cx('sign-btn')}>Đăng nhập</button>
                </Link>
            </form>
            {success && (
                <Modal onClick={handleCloseModal}>
                    <div className={cx('header_modal')}>
                        <FontAwesomeIcon className={cx('icon-check')} icon={faCircleCheck} />
                        <FontAwesomeIcon className={cx('icon-close')} icon={faXmark} onClick={handleCloseModal} />
                    </div>
                    <p className={cx('success-text')}>Đăng ký thành công</p>
                    <div className={cx('footer_modal')}>
                        <Link to="/login" className={cx('link-btn')}>
                            Đăng nhập
                        </Link>
                    </div>
                </Modal>
            )}
        </>
    );
}

export default RegisterForm;
