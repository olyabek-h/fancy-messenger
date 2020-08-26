import React, { useReducer } from 'react'
import styles from './messenger.module.scss'
import Head from '../components/head'
import ChatList from '../components/chatList'
import ChatItem from '../components/chatItem'
import ChatBox from '../components/chatBox'
import { INIT_STATE, reducer } from '../stateManager/reducer'
import { chatSelected, messageSubmitted, chatBoxClosed } from '../stateManager/actionCreator'

export default function Messenger() {
  const [{ userId, chatList, messages, selectedChatId }, dispatch] = useReducer(reducer, INIT_STATE)

  const selectedChatInfo = chatList.filter(chat => chat.id === selectedChatId)[0];
  const selectedChatMessages = messages.filter(x => x.chatId === selectedChatId);

  function handleChatSelect(id) {
    dispatch(chatSelected(id));
  }

  function handleSubmitMessage(text) {
    dispatch(messageSubmitted(text));
  }

  function handleCloseChatBox() {
    dispatch(chatBoxClosed());
  }

  return (
    <div className={styles['layout']}>
      <div className={styles['side']}>
        <div className={styles['head']}>
          <Head />
        </div>
        <div className={styles['chatList']}>
          <ChatList>
            {chatList.map(chat => {
              const chatMessages = messages.filter(x => x.chatId === chat.id);
              const lastMessage = chatMessages[chatMessages.length - 1];
              return <ChatItem key={chat.id}
                name={chat.name}
                avatar={chat.avatar}
                unreadMessageCount={chat.unreadMessageCount}
                lastMessage={lastMessage.text}
                time={lastMessage.time}
                selected={chat.id === selectedChatId}
                onSelect={() => handleChatSelect(chat.id)}
              />
            })}
          </ChatList>
        </div>
      </div>
      <div className={styles['main']}>
        {selectedChatId &&
          <ChatBox
            avatar={selectedChatInfo.avatar}
            name={selectedChatInfo.name}
            onSubmitMessage={handleSubmitMessage}
            selectedChatId={selectedChatId}
            onClose={handleCloseChatBox}
            messages={
              selectedChatMessages.map(message => (
                {
                  id: message.id,
                  text: message.text,
                  time: message.time,
                  me: message.userId === userId
                }
              ))
            }
          />
        }
      </div>
    </div>
  )
}