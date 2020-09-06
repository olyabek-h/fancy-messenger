import React, { useEffect } from 'react'
import styles from './chat.module.scss'
import Head from '../components/head'
import ChatList from '../components/chatList'
import ChatItem from '../components/chatItem'
import ChatBox from '../components/chatBox'
import { chatSelected, messageSubmitted, chatBoxClosed, initDataLoaded } from '../stateManager/actionCreator'
import { useAppState } from '../context/appStateContext'
import { useDispatch } from '../context/dispatchContext'
import { loadContacts, loadRecentChats, loadMessages, submitMessage } from '../services/services'

export default function Chat() {
  const { userId, chatList, messages, selectedChatId, searchedKeyword } = useAppState();
  const dispatch = useDispatch();

  const selectedChatInfo = chatList.filter(chat => chat.id === selectedChatId)[0];
  const selectedChatMessages = messages.filter(x => x.chatId === selectedChatId);

  function handleChatSelect(chatId) {
    loadMessages(chatId, userId)
      .then(data => {
        dispatch(chatSelected(chatId, data));
      })
  }

  function handleSubmitMessage(message) {
    submitMessage(selectedChatId, userId, message)
      .then(messageId => {
        dispatch(messageSubmitted(message, messageId));
      })
  }

  function handleCloseChatBox() {
    dispatch(chatBoxClosed());
  }

  useEffect(
    () => {
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
        })
    }, [userId, dispatch]
  )

  return (
    <div className={styles['layout']}>
      <div className={styles['side']}>
        <div className={styles['head']}>
          <Head />
        </div>
        <div className={styles['chatList']}>
          <ChatList>
            {chatList
              .filter(x => x.name.toLowerCase().includes(searchedKeyword.toLocaleLowerCase()))
              .map(chat => {
                const chatMessages = messages.filter(x => x.chatId === chat.id);
                const lastMessage = chatMessages[chatMessages.length - 1];
                return <ChatItem
                  key={chat.id}
                  name={chat.name}
                  avatar={chat.avatar}
                  unreadMessageCount={chat.unreadMessageCount}
                  lastMessage={lastMessage ? lastMessage.text : ''}
                  time={lastMessage ? lastMessage.time : ''}
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