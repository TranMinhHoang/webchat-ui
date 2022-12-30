import Avatar from 'react-avatar';

function Profile() {
    return (
        <div class="modal_myinfo">
            <div class="myinfo_form">
                <div class="header_myinfo">
                    <div class="myinfo_text">
                        <span>Thông tin tài khoản</span>
                    </div>
                    <ion-icon
                        onclick="lose_myimg()"
                        class="myinfo_close"
                        name="close-outline"
                    ></ion-icon>
                </div>
                <div class="body_myinfo">
                    <div class="img_cover">
                        <Avatar />
                    </div>
                    <div class="img_avtinfo">
                        <Avatar />
                    </div>
                    <div class="info">
                        <div class="name">
                            <span>
                                <b>Nguyễn Thành Hải</b>
                            </span>
                        </div>
                        <div class="text_iteminfo">
                            <span>
                                <b>Thông tin cá nhân</b>
                            </span>
                        </div>
                        <div class="iteminfo">
                            <div class="left_myinfo">
                                <li>Bio</li>
                                <li>Điện thoại</li>
                                <li>Giới tính</li>
                                <li>Ngày sinh</li>
                            </div>
                            <div class="right_myinfo">
                                <li>NTH</li>
                                <li>0989888999</li>
                                <li>Nam</li>
                                <li>01 tháng 04, 2000</li>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="footer_myinfo">
                    <div class="footer_myinfo1">
                        <button class="update_info">
                            <span class="text_update">Cập nhật thông tin</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
