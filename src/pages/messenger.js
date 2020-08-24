import React from 'react'
import styles from './messenger.module.scss'
import Head from '../components/head'
import ChatList from '../components/chatList'
import ChatItem from '../components/chatItem'

export default function Messenger() {

  return (
    <div className={styles['layout']}>
      <div className={styles['side']}>
        <div className={styles['head']}>
          <Head />
        </div>
        <div className={styles['chatList']}>
          <ChatList>
            <ChatItem name='Maryam Habibi' avatar='/avatar-f.jpg' time='21:14' unreadMessageCount={65} lastMessage='Hi, This is a message' />
            <ChatItem name='Mina Mohammadi' avatar='/avatar-f.jpg' time='11:30' unreadMessageCount={15} lastMessage='Another Message' />
            <ChatItem name='Reza Ahmadi' avatar='/avatar.png' time='21:14' unreadMessageCount={65} lastMessage='Hi, This is a message' />
            <ChatItem name='Afshin Karimi' avatar='/avatar.png' time='11:30' unreadMessageCount={15} lastMessage='Another Message' selected />
            <ChatItem name='Mohammad Mardan Nia' avatar='/avatar.png' time='21:14' unreadMessageCount={65} lastMessage='Hi, This is a message' />
            <ChatItem name='Sarah Kiani' avatar='/avatar-f.jpg' time='11:30' unreadMessageCount={15} lastMessage='Another Message' />
            <ChatItem name='Minoo Mohammadian' avatar='/avatar-f.jpg' time='21:14' unreadMessageCount={65} lastMessage='Hi, This is a message' />
            <ChatItem name='Fereydoon Sabet' avatar='/avatar.png' time='11:30' unreadMessageCount={15} lastMessage='Another Message' />
            <ChatItem name='Zahra Gholami' avatar='/avatar-f.jpg' time='21:14' unreadMessageCount={65} lastMessage='Hi, This is a message' />
            <ChatItem name='Mohammad Bayat' avatar='/avatar.png' time='11:30' unreadMessageCount={15} lastMessage='Another Message' />
          </ChatList>
        </div>
      </div>
      <div className={styles['main']}>
        <div className={styles['chatHead']}>

        </div>
        <div className={styles['chatDetail']}>

        </div>
      </div>
    </div>
  )
}