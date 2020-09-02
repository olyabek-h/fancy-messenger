export const ACTIONS = {
    CHAT_SELECTED: 'CHAT_SELECTED',
    MESSAGE_SUBMITTED: 'MESSAGE_SUBMITTED',
    CHAT_BOX_CLOSED: 'CHAT_BOX_CLOSED',
    KEYWORD_SEARCHED: 'KEYWORD_SEARCHED',
    USER_SIGNED_IN: 'USER_SIGNED_IN',
    CONTACTS_LOADED: 'CONTACTS_LOADED',
    CHAT_LIST_LOADED: 'CHAT_LIST_LOADED',
}

export const chatSelected = id => ({ type: ACTIONS.CHAT_SELECTED, payload: id })
export const messageSubmitted = text => ({ type: ACTIONS.MESSAGE_SUBMITTED, payload: text })
export const chatBoxClosed = () => ({ type: ACTIONS.CHAT_BOX_CLOSED })
export const keywordSearched = text => ({ type: ACTIONS.KEYWORD_SEARCHED, payload: text })
export const userSignedIn = user => ({ type: ACTIONS.USER_SIGNED_IN, payload: user })
export const contactsLoaded = contacts => ({ type: ACTIONS.CONTACTS_LOADED, payload: contacts })
export const chatListLoaded = chatList => ({ type: ACTIONS.CHAT_LIST_LOADED, payload: chatList })