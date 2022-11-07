import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import FormHeading from '~/components/SignForm/FormHeading';
import FormGroup from '~/components/SignForm/FormGroup';
import SignButton from '~/components/SignForm/SignButton';

function Register() {
    return (
        <Fragment>
            <FormHeading title="Đăng ký" />
            <FormGroup type="text" placeholder="Tên đăng nhập" />
            <FormGroup type="password" placeholder="Mật khẩu" />
            <FormGroup type="password" placeholder="Xác nhận mật khẩu" />
            <FormGroup type="text" placeholder="Email" />
            <FormGroup type="text" placeholder="Số điện thoại" />
            <SignButton type="submit" value="Đăng ký" />
            <Link to="/login">
                <SignButton type="submit" value="Đăng nhập" />
            </Link>
        </Fragment>
    );
}

export default Register;
