import React, { forwardRef } from 'react'
import styles from './textMessage.module.scss'
import moment from 'moment'

export default forwardRef(({ message }, ref) => {
    const { me, text, time } = message;
    return (
        <li
            className={styles[me ? 'me' : '']}
            ref={ref}
        >
            <span>{text}</span>
            <span>{moment(time).format('hh:mm')}</span>
        </li>
    )
})