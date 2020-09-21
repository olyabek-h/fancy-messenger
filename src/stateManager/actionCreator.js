import { loadContacts, loadRecentChats } from '../services/services'

export const ACTIONS = {
    CHAT_SELECTED: 'CHAT_SELECTED',
    // MESSAGE_SUBMITTED: 'MESSAGE_SUBMITTED',
    CHAT_BOX_CLOSED: 'CHAT_BOX_CLOSED',
    KEYWORD_SEARCHED: 'KEYWORD_SEARCHED',
    USER_SIGNED_IN: 'USER_SIGNED_IN',
    // CONTACTS_LOADED: 'CONTACTS_LOADED',
    // CHAT_LIST_LOADED: 'CHAT_LIST_LOADED',
    INIT_DATA_LOADED: 'INIT_DATA_LOADED',
    CHAT_CREATED: 'CHAT_CREATED',
    LOAD_PREPEND_MESSAGES: 'LOAD_PREPEND_MESSAGES',
    NEW_USER_REGISTERED: 'NEW_USER_REGISTERED',
    NEW_MESSAGE_RECIEVED: 'NEW_MESSAGE_RECIEVED',
    USER_SIGNED_OUT: 'USER_SIGNED_OUT',
    LOADING_INIT_DATA: 'LOADING_INIT_DATA',
    LOADING: 'LOADING',
}

// export const chatSelected = id => ({ type: ACTIONS.CHAT_SELECTED, payload: id })
export const chatSelected = (chatId, data) => ({ type: ACTIONS.CHAT_SELECTED, payload: { chatId, data } })
// export const messageSubmitted = (message, messageId) => ({ type: ACTIONS.MESSAGE_SUBMITTED, payload: { message, messageId } })
export const chatBoxClosed = () => ({ type: ACTIONS.CHAT_BOX_CLOSED })
export const keywordSearched = text => ({ type: ACTIONS.KEYWORD_SEARCHED, payload: text })
export const userSignedIn = user => ({ type: ACTIONS.USER_SIGNED_IN, payload: user })
// export const contactsLoaded = contacts => ({ type: ACTIONS.CONTACTS_LOADED, payload: contacts })
// export const chatListLoaded = chatList => ({ type: ACTIONS.CHAT_LIST_LOADED, payload: chatList })
export const initDataLoaded = initData => ({ type: ACTIONS.INIT_DATA_LOADED, payload: initData })
export const chatCreated = (chatId, name) => ({ type: ACTIONS.CHAT_CREATED, payload: { chatId, name } })
export const loadPrependMessages = (chatId, data) => ({ type: ACTIONS.LOAD_PREPEND_MESSAGES, payload: { chatId, data } })
export const newUserRegistered = user => ({ type: ACTIONS.NEW_USER_REGISTERED, payload: user })
export const newMessageRecieved = data => ({ type: ACTIONS.NEW_MESSAGE_RECIEVED, payload: data })
export const userSignedOut = () => ({ type: ACTIONS.USER_SIGNED_OUT })
export const loading = () => ({ type: ACTIONS.LOADING })

export const loadingInitData = (userId) => {
    return (dispatch) => {
        dispatch(loading());
        Promise.all([
            loadContacts(userId),
            loadRecentChats(userId),
        ])
            .then(([contacts, chatList]) => {
                dispatch(initDataLoaded(
                    {
                        contacts,
                        chatList,
                    }
                ))
            });
    }
}