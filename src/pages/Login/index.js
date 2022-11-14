import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import FormHeading from '~/components/SignForm/FormHeading';
import { FormGroupPassword, FormGroupText } from '~/components/SignForm/FormGroup';
import SignButton from '~/components/SignForm/SignButton';

function Login() {
    return (
        <Fragment>
            <FormHeading title="Đăng nhập" />
            <FormGroupText placeholder="Tên đăng nhập" />
            <FormGroupPassword placeholder="Mật khẩu" />
            <SignButton type="submit" value="Đăng nhập" />
            <Link to="/register">
                <SignButton type="submit" value="Đăng Ký" />
            </Link>
        </Fragment>
    );
}

export default Login;
