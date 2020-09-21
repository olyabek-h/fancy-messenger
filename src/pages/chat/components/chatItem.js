import React from 'react';
import styles from './chatItem.module.scss'
import Avatar from '../../../components/avatar'
import moment from 'moment'

export default function ChatItem({ name, avatar, lastMessage, time, unreadMessageCount, selected, onSelect }) {

    return (
        <div onClick={onSelect} className={styles['chatItem'] + ' ' + styles[!!selected ? 'selected' : '']}>
            <div className={styles['avatar']}>
                <Avatar src={avatar} alt={name} />
            </div>
            <span className={styles['name']}>{name}</span>
            <span className={styles['time']}>{time && moment(time).format('hh:mm')}</span>
            <span className={styles['lastMessage']}>{lastMessage}</span>
            {!!unreadMessageCount && <span className={styles['unreadMessageCount']}>{unreadMessageCount}</span>}
        </div>
    )
}