import * as request from '../utility/request'

export function signIn(name) {
    return request.post('users', { name });
}

export function loadContacts(userId) {
    return new Promise(resolve => {
        return request.get('users')
            .then(({ success, result }) => {
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

export function startChat(peerId1, peerId2) {
    return new Promise(resolve => {
        request.post(`chats/start/user`,
            {
                peer1: peerId1,
                peer2: peerId2
            }
        )
            .then(({ success, result }) => {
                if (success) {
                    resolve(result.id);
                }
            })
    })
}

export function loadMessages(chatId, userId, lastMessageId) {
    let url = `chats/load/${chatId}/user/${userId}/`
    if (lastMessageId)
        url += `?message=${lastMessageId}`
    return new Promise(resolve => {
        request.get(url)
            .then(({ success, result }) => {
                if (success) {
                    resolve(result);
                }
            })
    })
}

export function submitMessage(chatId, userId, message) {
    return new Promise(resolve => {
        request.post(`chats/submit/user/${userId}`,
            {
                chatId,
                message
            }
        )
            .then(({ success, result }) => {
                if (success) {
                    resolve(result.id);
                }
            })
    })
}