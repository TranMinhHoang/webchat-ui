import classNames from 'classnames/bind';
import styles from './FormHeading.module.scss';

const cx = classNames.bind(styles);

function FormHeading({ title }) {
    return <h1 className={cx('form-heading')}>{title}</h1>;
}

export default FormHeading;
