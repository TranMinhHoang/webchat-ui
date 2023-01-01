import BoxchatLayout from '~/layouts/BoxchatLayout';

function Boxchat({ listUserOnline, setListUserOnline, handleDisconnect }) {
    return (
        <BoxchatLayout
            listUserOnline={listUserOnline}
            setListUserOnline={setListUserOnline}
            handleDisconnect={handleDisconnect}
        />
    );
}

export default Boxchat;
