export const ACTION = {
    CHAT_SELECTED: 'CHAT_SELECTED',
}

export const chatSelected = id => ({type: ACTION.CHAT_SELECTED, payload: id})