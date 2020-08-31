import React from 'react'
import styles from './secondaryLayout.module.scss'

export default function SecondaryLayout({Component}) {
    return (
        <div className={styles['secondaryLayout']}>
            <div className={styles['container']}>
                <Component />
            </div>
        </div>
    )
}