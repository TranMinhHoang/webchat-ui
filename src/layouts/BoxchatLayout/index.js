import classNames from 'classnames/bind';
import { useState } from 'react';

import styles from './BoxchatLayout.module.scss';
import LeftSide from './components/LeftSide';
import RightSide from './components/RightSide';
const cx = classNames.bind(styles);

function BoxchatLayout() {
    const [user, setUser] = useState({});

    const onClick = (item) => {
        setUser(item);
        console.log(item);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <LeftSide onClick={onClick} />
                <RightSide user={user} />
            </div>
        </div>
    );
}

export default BoxchatLayout;
