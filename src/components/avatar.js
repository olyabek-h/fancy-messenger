import React from 'react'
import styles from './avatar.module.scss'

export default function Avatar({ src, alt }) {

    return (
        <img className={styles['avatar']} src={src} alt={alt} />
    )
}