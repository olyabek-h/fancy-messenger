import { ACTIONS } from './actionCreator'

export const INIT_STATE = {
    name: '',
    userId: null,
    chatList: [
        // { id: 1, name: 'Ali', avatar: '/avatar.png', unreadMessageCount: 2665, time: '21:14' },
        // { id: 2, name: 'Bahman', avatar: '/avatar.png', unreadMessageCount: 5, time: '11:30' },
    ],
    messages: [
        // { id: 1, chatId: 1, userId: 2, time: '11:30', text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here' },
        // { id: 2, chatId: 1, userId: 1, time: '11:32', text: 'A single line message.' },
        // { id: 3, chatId: 2, userId: 2, time: '11:34', text: 'ontrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words' },
        // { id: 4, chatId: 2, userId: 2, time: '11:37', text: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable.' },
        // { id: 5, chatId: 2, userId: 1, time: '11:42', text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here' },
    ],
    selectedChatId: null,
    searchedKeyword: '',
    contacts: [
        // {id: 1, name: 'Hossein'}
    ],
}

export function reducer(state, action) {
    return (ACTION_HANDLERS[action.type] || (() => state))(state, action.payload)
}

const ACTION_HANDLERS = {
    [ACTIONS.CHAT_SELECTED]: handleChatSelected,
    // [ACTIONS.MESSAGE_SUBMITTED]: handleMessageSubmitted,
    [ACTIONS.CHAT_BOX_CLOSED]: handleChatBoxClosed,
    [ACTIONS.KEYWORD_SEARCHED]: handleKeywordSearched,
    [ACTIONS.USER_SIGNED_IN]: handleUserSignedIn,
    // [ACTIONS.CONTACTS_LOADED]: handleContactsLoaded,
    // [ACTIONS.CHAT_LIST_LOADED]: handleChatListLoaded,
    [ACTIONS.INIT_DATA_LOADED]: handleInitDataLoaded,
    [ACTIONS.CHAT_CREATED]: handleChatCreated,
    [ACTIONS.LOAD_PREPEND_MESSAGES]: handleLoadPrependMessages,
    [ACTIONS.NEW_USER_REGISTERED]: handleNewUserRegistered,
    [ACTIONS.NEW_MESSAGE_RECIEVED]: handleNewMessageRecieved,
}

function handleChatSelected(state, { chatId, data }) {
    const selectedChatIndex = state.chatList.findIndex(chat => chat.id === chatId);
    const modifiedSelectedChat = { ...state.chatList[selectedChatIndex], unreadMessageCount: 0 };   //  9   shalow
    return {
        ...state,
        selectedChatId: chatId,
        chatlist: [
            ...state.chatList.splice(selectedChatIndex, 1, modifiedSelectedChat)
        ],
        messages: [
            ...state.messages.filter(msg => msg.chatId !== chatId),
            ...data.messages.map(msg =>
                ({
                    id: msg.id,
                    chatId,
                    userId: msg.userId,
                    time: msg.date,
                    text: msg.content,
                })
            )
        ],
    }
}

// function handleMessageSubmitted(state, payload) {
//     return {
//         ...state,
//         messages: [
//             ...state.messages,
//             {
//                 id: Math.random(),
//                 chatId: state.selectedChatId,
//                 userId: state.userId,
//                 time: Date.now(),
//                 text: payload.message
//             }
//         ]
//     }
// }

function handleChatBoxClosed(state) {
    return {
        ...state,
        selectedChatId: null,
    }
}

function handleKeywordSearched(state, payload) {
    return {
        ...state,
        searchedKeyword: payload,
    }
}

function handleUserSignedIn(state, payload) {
    return {
        ...state,
        name: payload.name,
        userId: payload.id,
    }
}

// function handleContactsLoaded(state, payload) {
//     return {
//         ...state,
//         contacts: payload.filter(contact => contact.id !== state.userId),
//     }
// }

// function handleChatListLoaded(state, payload) {
//     return {
//         ...state,
//         chatList: payload
//     }
// }

function handleInitDataLoaded(state, { chatList, contacts }) {
    const newMessages = [...state.messages];
    chatList.forEach(chat => {
        if (chat.lastMessage) {
            newMessages.push({
                id: chat.lastMessage.id,
                chatId: chat.id,
                userId: chat.lastMessage.userId,
                time: chat.lastMessage.date,
                text: chat.lastMessage.content,
            })
        }
    });
    return {
        ...state,
        chatList: chatList.map(chat => ({ ...chat, avatar: '/avatar.png' })),
        contacts: contacts.filter(contact => contact.id !== state.userId),
        messages: newMessages,
    }
}

function handleChatCreated(state, { chatId, name }) {
    let newChatList = state.chatList;       //  9       let newChatlist = [...state.chatList]
    if (!state.chatList.some(chat => chat.id === chatId)) {
        const newChat = {
            id: chatId,
            name,
            avatar: '/avatar.png',
            unreadMessageCount: 0,
            time: ''
        }
        newChatList = [newChat, ...state.chatList]
    }
    return {
        ...state,
        selectedChatId: chatId,
        chatList: newChatList,
    }
}

function handleLoadPrependMessages(state, { chatId, data }) {
    return {
        ...state,
        messages: [
            ...data.messages.map(msg =>
                ({
                    id: msg.id,
                    chatId,
                    userId: msg.userId,
                    time: msg.date,
                    text: msg.content,
                })
            ),
            ...state.messages,
        ],
    }
}

function handleNewUserRegistered(state, payload) {
    return {
        ...state,
        contacts: [
            payload,
            ...state.contacts,
        ]
    }
}

function handleNewMessageRecieved(state, { chatId, message }) {
    const newChatList = [...state.chatList];
    if (!state.chatList.some(chat => chat.id === chatId)) {
        const newChat = {
            id: chatId,
            name: state.contacts.find(contact => contact.id === message.userId).name,
            avatar: '/avatar.png',
            unreadMessageCount: 1,
            time: message.date
        }
        newChatList.unshift(newChat);        
    }
    else if (state.selectedChatId !== chatId) {
        const chatIndex = state.chatList.findIndex(chat => chat.id === chatId);
        const updatedChat = {
            ...state.chatList[chatIndex],
            unreadMessageCount: state.chatList[chatIndex].unreadMessageCount + 1,
        }
        newChatList.splice(chatIndex, 1);
        newChatList.unshift(updatedChat);
    }

    const newMessage = {
        id: message.id,
        chatId,
        userId: message.userId,
        time: message.date,
        text: message.content
    }

    return {
        ...state,
        chatList: newChatList,
        messages: [
            ...state.messages,
            newMessage
        ]
    }
}