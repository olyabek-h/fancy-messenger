import React from 'react'
import styles from './mainLayout.module.scss'

export default function MainLayout({Component}) {

    return (
        <div className={styles['app']}>
            <div className={styles['head']} />
            <div className={styles['main']}>
                <Component />
            </div>
        </div>
    );
}