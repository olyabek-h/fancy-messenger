import { ACTIONS } from './actionCreator'

export const INIT_STATE = {
    userId: 1,
    chatList: [
        { id: 1, name: 'Ali', avatar: '/avatar.png', unreadMessageCount: 2665, time: '21:14' },
        { id: 2, name: 'Bahman', avatar: '/avatar.png', unreadMessageCount: 5, time: '11:30' },
        // { id: 3, name: 'Nahid', avatar: '/avatar.png', unreadMessageCount: 65, time: '21:14' },        
    ],
    messages: [
        { id: 1, chatId: 1, userId: 2, time: '11:30', text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here' },
        { id: 2, chatId: 1, userId: 1, time: '11:32', text: 'A single line message.' },
        { id: 3, chatId: 2, userId: 2, time: '11:34', text: 'ontrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words' },
        { id: 4, chatId: 2, userId: 2, time: '11:37', text: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable.' },
        { id: 5, chatId: 2, userId: 1, time: '11:42', text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here' },
    ],
    selectedChatId: null,
}

export function reducer(state, action) {
    return (ACTION_HANDLERS[action.type] || (() => state))(state, action.payload)
}

const ACTION_HANDLERS = {
    [ACTIONS.CHAT_SELECTED]: handleChatSelected,
    [ACTIONS.MESSAGE_SUBMITTED]: handleMessageSubmitted,
    [ACTIONS.CHAT_BOX_CLOSED]: handleChatBoxClosed,
}

function handleChatSelected(state, payload) {
    const selectedChatIndex = state.chatList.findIndex(chat => chat.id === payload);
    const modifiedSelectedChat = { ...state.chatList[selectedChatIndex], unreadMessageCount: 0 };
    return {
        ...state,
        selectedChatId: payload,
        chatlist: [
            ...state.chatList.splice(selectedChatIndex, 1, modifiedSelectedChat)
        ]
    }
}

function handleMessageSubmitted(state, payload) {
    return {
        ...state,
        messages: [
            ...state.messages,
            {
                id: Math.random(),
                chatId: state.selectedChatId,
                userId: state.userId,
                time: Date.now(),
                text: payload
            }
        ]
    }
}

function handleChatBoxClosed(state) {
    return {
        ...state,
        selectedChatId: null,
    }
}