import React from 'react'
import styles from './headbar.module.scss'

export default function Headbar({ first, middle, last }) {
    return (
        <div className={styles['headbar']}>
            <div className={styles['first']}>{first}</div>
            <div className={styles['middle']}>{middle}</div>
            <div className={styles['last']}>{last}</div>
        </div>
    )
}