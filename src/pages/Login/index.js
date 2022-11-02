import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import FormHeading from '~/components/SignForm/FormHeading';
import FormGroup from '~/components/SignForm/FormGroup';
import SignButton from '~/components/SignForm/SignButton';

function Login() {
    return (
        <Fragment>
            <FormHeading title="Đăng nhập" />
            <FormGroup type="text" placeholder="Tên đăng nhập" />
            <FormGroup type="password" placeholder="Mật khẩu" />
            <SignButton type="submit" value="Đăng nhập" />
            <Link to="/register">
                <SignButton type="submit" value="Đăng Ký" />
            </Link>
        </Fragment>
    );
}

export default Login;
