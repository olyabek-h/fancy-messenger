import Login from '../pages/login/login'
import Chat from '../pages/chat/chat'

export const ROUTES = [
    {
        path: '/chat',
        component: Chat,
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