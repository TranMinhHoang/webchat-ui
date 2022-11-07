// Layout
import SignLayout from '~/layouts/SignLayout';
// import BoxchatLayout from '~/layouts/Boxchat/components/BoxchatLayout';

//Pages
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import Boxchat from '~/pages/Boxchat';

// public routes
const publicRoutes = [
    { path: '/', component: Boxchat },
    { path: '/login', component: Login, layout: SignLayout },
    { path: '/register', component: Register, layout: SignLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
