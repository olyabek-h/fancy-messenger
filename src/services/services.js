import * as request from '../utility/request'

export function signIn(name) {
    return request.post('users', { name });
}

export function loadContacts(userId) {
    return new Promise(resolve => {
        return request.get('users')
            .then(({ success, result }) => {
                console.log(success);
                if (success) {
                    resolve(result);
                }
            })
    })
}

export function loadRecentChats(userId) {
    return new Promise(resolve => {
        request.get(`chats/recent/user/${userId}`)
            .then(({ success, result }) => {
                if (success) {
                    resolve(result);
                }
            })
    })
}