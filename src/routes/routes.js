import Login from '../pages/login'
import Messenger from '../pages/messenger'

export const ROUTES = [
    {
        path: '/messenger',
        component: Messenger,
        private: true,
    },
    {
        path: '/login',
        component: Login,
        private: false,
    },
    {
        path: '/',
        component: Login,
        private: false,
    }
]