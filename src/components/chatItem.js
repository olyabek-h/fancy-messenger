import React from 'react';
import styles from './chatItem.module.scss'
import Avatar from './avatar'

export default function ChatItem({ name, avatar, lastMessage, time, unreadMessageCount, selected, onSelect }) {

    return (
        // <div className={styles[!!selected ? 'chatItem selected' : 'chatItem']}>
        <div onClick={onSelect} className={styles['chatItem'] + ' ' + styles[!!selected ? 'selected' : '']}>
            <div className={styles['avatar']}>
                <Avatar src={avatar} alt={name} />
            </div>
            <span className={styles['name']}>{name}</span>
            <span className={styles['time']}>{time}</span>
            <span className={styles['lastMessage']}>{lastMessage}</span>
            <span className={styles['unreadMessageCount']}>{unreadMessageCount}</span>
        </div>
    )
}