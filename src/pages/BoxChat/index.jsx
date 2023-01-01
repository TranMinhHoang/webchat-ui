import BoxchatLayout from '~/layouts/BoxchatLayout';

function Boxchat({ onlineUserList, setOnlineUserList, handleDisconnect }) {
    return (
        <BoxchatLayout
            onlineUserList={onlineUserList}
            setOnlineUserList={setOnlineUserList}
            handleDisconnect={handleDisconnect}
        />
    );
}

export default Boxchat;
