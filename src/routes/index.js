// Layout
import SignLayout from '~/layouts/SignLayout';
// import BoxchatLayout from '~/layouts/Boxchat/components/BoxchatLayout';

//Pages
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import Boxchat from '~/pages/Boxchat';

// public routes
const publicRoutes = [
    { path: '/', component: Login, layout: SignLayout },
    { path: '/register', component: Register, layout: SignLayout },
    { path: '/boxchat', component: Boxchat },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
