import classNames from 'classnames/bind';
import styles from './BoxchatLayout.module.scss';
import LeftSide from '~/components/Boxchat/LeftSide';
import RightSide from '~/components/Boxchat/RightSide';

const cx = classNames.bind(styles);

function BoxchatLayout() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <LeftSide />
                <RightSide />
            </div>
        </div>
    );
}

export default BoxchatLayout;
