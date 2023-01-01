import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SockJsClient from 'react-stomp';
import { publicRoutes } from '~/routes';
import Boxchat from './pages/BoxChat';

function App() {
    const [listUserOnline, setListUserOnline] = useState(
        JSON.parse(localStorage.getItem('userOnline') || '{}'),
    );
    const sockRef = useRef();
    const handleDisconnect = (id) => {
        sockRef.current.sendMessage(
            '/app/user-online',
            JSON.stringify({
                id: id,
                status: false,
            }),
        );
    };

    return (
        <Router>
            <div className="App">
                <SockJsClient
                    ref={sockRef}
                    url="http://localhost:8080/websocket-chat/"
                    topics={['/topic/userOnline']}
                    onMessage={(msg) => {
                        console.log(msg);

                        // const result = {};
                        // for (const item of msg) {
                        //     if (!result[item.id]) {
                        //         result[item.id] = item.status;
                        //     }
                        // }
                        // // console.log(result);
                        // setListUserOnline((prev) => ({
                        //     ...prev,
                        //     ...result,
                        // }));
                        // localStorage.setItem(
                        //     'userOnline',
                        //     JSON.stringify(listUserOnline),
                        // );
                    }}
                />
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = Boxchat;
                        if (route.layout) {
                            Layout = route.layout;
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout
                                        listUserOnline={listUserOnline}
                                        setListUserOnline={setListUserOnline}
                                        handleDisconnect={handleDisconnect}
                                    >
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
