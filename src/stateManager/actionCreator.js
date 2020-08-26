export const ACTIONS = {
    CHAT_SELECTED: 'CHAT_SELECTED',
    MESSAGE_SUBMITTED: 'MESSAGE_SUBMITTED',
    CHAT_BOX_CLOSED: 'CHAT_BOX_CLOSED',
}

export const chatSelected = id => ({ type: ACTIONS.CHAT_SELECTED, payload: id })
export const messageSubmitted = text => ({ type: ACTIONS.MESSAGE_SUBMITTED, payload: text })
export const chatBoxClosed = () => ({ type: ACTIONS.CHAT_BOX_CLOSED })