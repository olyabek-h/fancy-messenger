import React from 'react'
import styles from './chatList.module.scss'

export default function ChatList({ children }) {

    return (
        <div className={styles['chatItem']}>
            {children}
        </div>
    )
}