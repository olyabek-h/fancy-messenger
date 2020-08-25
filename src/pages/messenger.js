import React from 'react'
import styles from './messenger.module.scss'
import Head from '../components/head'
import ChatList from '../components/chatList'
import ChatItem from '../components/chatItem'
import ChatBox from '../components/chatBox'

export default function Messenger() {

  return (
    <div className={styles['layout']}>
      <div className={styles['side']}>
        <div className={styles['head']}>
          <Head />
        </div>
        <div className={styles['chatList']}>
          <ChatList>
            <ChatItem name='Maryam Habibi' avatar='/avatar-f.jpg' time='21:14' unreadMessageCount={2665} lastMessage='Hi, This is a message' />
            <ChatItem name='Mina Mohammadi' avatar='/avatar-f.jpg' time='11:30' unreadMessageCount={5} lastMessage='Another Message' />
            <ChatItem name='Reza Ahmadi' avatar='/avatar.png' time='21:14' unreadMessageCount={65} lastMessage='Hi, This is a message' />
            <ChatItem name='Afshin Karimi' avatar='/avatar.png' time='11:30' unreadMessageCount={155} lastMessage='Another Message' selected />
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
        <ChatBox
          avatar='/avatar.png'
          name='Afshin Karimi'
          messages={
            [
              { id: '1', me: false, time:'11:30', text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here'" },
              { id: '2', me: true, time:'11:32', text: "A single line message." },
              { id: '3', me: false, time:'11:34', text: "ontrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words" },
              { id: '4', me: false, time:'11:37', text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. " },
              { id: '5', me: true, time:'11:42',  text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here'" },
            ]
          }
        />
      </div>
    </div>
  )
}