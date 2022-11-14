import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import FormHeading from '~/components/SignForm/FormHeading';
import SignButton from '~/components/SignForm/SignButton';
import { FormGroupPassword, FormGroupText } from '~/components/SignForm/FormGroup';

function Register() {
    return (
        <Fragment>
            <FormHeading title="Đăng ký" />
            <FormGroupText type="text" placeholder="Tên đăng nhập" />
            <FormGroupPassword type="password" placeholder="Mật khẩu" />
            <FormGroupPassword type="password" placeholder="Xác nhận mật khẩu" />
            <FormGroupText type="text" placeholder="Email" />
            <FormGroupText type="text" placeholder="Số điện thoại" />
            <SignButton type="submit" value="Đăng ký" />
            <Link to="/login">
                <SignButton type="submit" value="Đăng nhập" />
            </Link>
        </Fragment>
    );
}

export default Register;
