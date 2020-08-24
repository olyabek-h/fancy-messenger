import React from 'react';
import styles from './chatItem.module.scss'

export default function ChatItem({name, avatar, lastMessage, time, unreadMessageCount}) {

    return (
        <div className={styles['chatItem']}>
                <img className={styles['avatar']} src={avatar} alt="name"/>
                <span className={styles['name']}>{name}</span>
                <span className={styles['time']}>{time}</span>
                <span className={styles['lastMessage']}>{lastMessage}</span>                
                <span className={styles['unreadMessageCount']}>{unreadMessageCount}</span>
        </div>
    )
}