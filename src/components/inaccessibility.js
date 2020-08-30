import React from 'react'
import styles from './inaccessibility.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserLock } from '@fortawesome/free-solid-svg-icons'

export default function Inaccessibility() {
    return (
        <div className={styles['inaccessibility']}>
            <div className={styles['layout']}>
                <FontAwesomeIcon icon={faUserLock} size="7x" />
                <p>You must login first.</p>
            </div>
        </div>
    )
}