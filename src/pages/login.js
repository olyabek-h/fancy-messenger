import React from 'react'
import styles from './login.module.scss'

export default function Login() {
    return (
        <div className={styles['login']}>
            <div className={styles['layout']}>
                <p>this is login page</p>
            </div>
        </div>
    )
}